import express from 'express';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Users route - to be implemented'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

export default router;