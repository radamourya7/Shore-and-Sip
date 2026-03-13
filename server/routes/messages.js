import express from 'express';
import Message from '../models/Message.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, phone, message } = req.body;
    const msg = await Message.create({ name, email, phone, message });
    res.status(201).json(msg);
});

router.get('/', protect, adminOnly, async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
});

router.put('/:id/read', protect, adminOnly, async (req, res) => {
    const msg = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(msg);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
});

export default router;
