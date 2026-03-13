import express from 'express';
import multer from 'multer';
import path from 'path';
import Room from '../models/Room.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// GET /api/rooms — public
router.get('/', async (req, res) => {
    const rooms = await Room.find({});
    res.json(rooms);
});

// GET /api/rooms/:id — public
router.get('/:id', async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
});

// POST /api/rooms — admin
router.post('/', protect, adminOnly, upload.array('images', 10), async (req, res) => {
    const { name, description, pricePerNight, capacity, amenities, category, beachView } = req.body;
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const room = await Room.create({ name, description, pricePerNight, capacity, amenities: amenities ? JSON.parse(amenities) : [], images, category, beachView });
    res.status(201).json(room);
});

// PUT /api/rooms/:id — admin
router.put('/:id', protect, adminOnly, upload.array('images', 10), async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    const { name, description, pricePerNight, capacity, amenities, category, beachView, isAvailable } = req.body;
    const newImages = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    room.name = name || room.name;
    room.description = description || room.description;
    room.pricePerNight = pricePerNight || room.pricePerNight;
    room.capacity = capacity || room.capacity;
    room.amenities = amenities ? JSON.parse(amenities) : room.amenities;
    room.category = category || room.category;
    room.beachView = beachView !== undefined ? beachView : room.beachView;
    room.isAvailable = isAvailable !== undefined ? isAvailable : room.isAvailable;
    if (newImages.length > 0) room.images = [...room.images, ...newImages];
    await room.save();
    res.json(room);
});

// DELETE /api/rooms/:id — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
});

export default router;
