import express from 'express';
import Review from '../models/Review.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// GET approved reviews — public
router.get('/', async (req, res) => {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(reviews);
});

// GET all reviews — admin
router.get('/all', protect, adminOnly, async (req, res) => {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
});

// POST — public
router.post('/', async (req, res) => {
    const { name, email, rating, comment } = req.body;
    const review = await Review.create({ name, email, rating, comment });
    res.status(201).json(review);
});

// PUT approve/reject — admin
router.put('/:id', protect, adminOnly, async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: req.body.isApproved }, { new: true });
    res.json(review);
});

// DELETE — admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
});

export default router;
