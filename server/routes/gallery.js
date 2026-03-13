import express from 'express';
import multer from 'multer';
import Gallery from '../models/Gallery.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const images = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(images);
});

router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
    const { caption, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const item = await Gallery.create({ imageUrl, caption, category });
    res.status(201).json(item);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
});

export default router;
