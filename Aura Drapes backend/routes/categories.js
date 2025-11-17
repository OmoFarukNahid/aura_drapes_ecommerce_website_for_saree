// backend/routes/categories.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Category from '../models/Category.js';

const router = express.Router();

// GET all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// CREATE category (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name: name.trim() });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE category (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE category (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;