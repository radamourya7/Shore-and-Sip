import express from 'express';
import multer from 'multer';
import MenuItem from '../models/MenuItem.js';
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
    const items = await MenuItem.find(filter);
    res.json(items);
});

router.post('/', protect, adminOnly, upload.single('image'), async (req, res) => {
    const { name, description, price, category, isVeg } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const item = await MenuItem.create({ name, description, price, category, image, isVeg });
    res.status(201).json(item);
});

router.put('/:id', protect, adminOnly, upload.single('image'), async (req, res) => {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    const { name, description, price, category, isVeg, isAvailable } = req.body;
    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.category = category || item.category;
    item.isVeg = isVeg !== undefined ? isVeg : item.isVeg;
    item.isAvailable = isAvailable !== undefined ? isAvailable : item.isAvailable;
    if (req.file) item.image = `/uploads/${req.file.filename}`;
    await item.save();
    res.json(item);
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Menu item deleted' });
});

export default router;
