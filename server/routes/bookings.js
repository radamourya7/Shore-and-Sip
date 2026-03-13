import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { sendBookingConfirmation, sendAdminNotification } from '../utils/email.js';

const router = express.Router();

// Initialize Razorpay — falls back gracefully if keys are placeholder
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('YOUR_KEY')) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
}

// ─── POST /api/bookings/create-order ─────────────────────────────────────────
// Creates a Razorpay order before payment. Returns order details to frontend.
router.post('/create-order', async (req, res) => {
    const { room, checkIn, checkOut } = req.body;
    const roomData = await Room.findById(room);
    if (!roomData) return res.status(404).json({ message: 'Room not found' });

    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    if (nights < 1) return res.status(400).json({ message: 'Invalid dates' });

    const totalAmount = nights * roomData.pricePerNight;

    // If Razorpay not configured, return a mock order for development
    if (!razorpay) {
        return res.json({
            orderId: `mock_order_${Date.now()}`,
            amount: totalAmount * 100,
            currency: 'INR',
            keyId: 'rzp_test_placeholder',
            totalAmount,
            nights,
            roomName: roomData.name,
            isMock: true,
        });
    }

    const order = await razorpay.orders.create({
        amount: totalAmount * 100, // paise
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
    });

    res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        totalAmount,
        nights,
        roomName: roomData.name,
    });
});

// ─── POST /api/bookings/verify-payment ───────────────────────────────────────
// Verifies Razorpay payment signature, saves booking, sends emails.
router.post('/verify-payment', async (req, res) => {
    const {
        razorpay_payment_id, razorpay_order_id, razorpay_signature,
        name, email, phone, room, checkIn, checkOut, guests, specialRequests, totalAmount, isMock,
    } = req.body;

    // Verify signature (skip for mock orders in dev mode)
    if (!isMock && razorpay) {
        const expectedSig = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSig !== razorpay_signature) {
            return res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
        }
    }

    const roomData = await Room.findById(room);
    if (!roomData) return res.status(404).json({ message: 'Room not found' });

    // Save booking to DB
    const booking = await Booking.create({
        name, email, phone, room, checkIn, checkOut, guests, specialRequests,
        totalAmount, status: 'confirmed',
        paymentStatus: 'paid',
        paymentId: razorpay_payment_id || 'mock_payment',
        orderId: razorpay_order_id || 'mock_order',
    });

    // Send emails (non-blocking — errors don't fail the booking)
    Promise.allSettled([
        sendBookingConfirmation(booking, roomData),
        sendAdminNotification(booking, roomData),
    ]).then(results => {
        results.forEach((r, i) => {
            if (r.status === 'rejected') console.error(`Email ${i === 0 ? 'guest' : 'admin'} failed:`, r.reason?.message);
        });
    });

    res.status(201).json({ message: 'Booking confirmed', booking });
});

// ─── GET /api/bookings — admin ────────────────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
    const bookings = await Booking.find({}).populate('room', 'name pricePerNight').sort({ createdAt: -1 });
    res.json(bookings);
});

// ─── GET /api/bookings/room/:roomId — booked dates (public) ──────────────────
router.get('/room/:roomId', async (req, res) => {
    const bookings = await Booking.find(
        { room: req.params.roomId, status: { $ne: 'cancelled' } },
        'checkIn checkOut'
    );
    res.json(bookings);
});

// ─── PUT /api/bookings/:id — admin update status ──────────────────────────────
router.put('/:id', protect, adminOnly, async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    ).populate('room', 'name');
    res.json(booking);
});

// ─── DELETE /api/bookings/:id — admin ────────────────────────────────────────
router.delete('/:id', protect, adminOnly, async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
});

export default router;
