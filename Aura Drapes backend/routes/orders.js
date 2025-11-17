// backend/routes/orders.js
import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// Create order from frontend (public)
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status & cash collected
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, cashCollected } = req.body;
    const updateData = { status };

    if (status === 'cash-collected') {
      updateData.cashCollected = cashCollected;
      updateData.cashCollectedAt = new Date();
      updateData.cashCollectedBy = req.user._id;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
// DELETE order - Admin only
// DELETE order - Admin only (SAFE + INFORMATIVE)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or already deleted'
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (err) {
    console.error('Delete order error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting order'
    });
  }
});

export default router;