import express from 'express';
import Reservation from '../models/Reservation.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, phone, email, date, time, guests, specialRequests } = req.body;
    const reservation = await Reservation.create({ name, phone, email, date, time, guests, specialRequests });
    res.status(201).json(reservation);
});

router.get('/', protect, adminOnly, async (req, res) => {
    const reservations = await Reservation.find({}).sort({ date: -1 });
    res.json(reservations);
});

router.put('/:id', protect, adminOnly, async (req, res) => {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(reservation);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation deleted' });
});

export default router;
