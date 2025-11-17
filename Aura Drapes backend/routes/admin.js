import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Product from '../models/Product.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// All routes protected and admin only
router.use(protect);
router.use(authorize('admin'));

// Get all products (admin)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Create new product
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Optional: Delete from Cloudinary
    // if (product.image) {
    //   const publicId = product.image.split('/').pop().split('.')[0];
    //   await deleteFromCloudinary(publicId);
    // }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Upload to Cloudinary
router.post('/upload', async (req, res) => {
  try {
    const { image, resourceType = 'image' } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image'
      });
    }

    console.log('Starting Cloudinary upload...');
    const result = await uploadToCloudinary(image, resourceType);
    console.log('Cloudinary upload successful:', result.secure_url);

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update popular products order
router.put('/popular-order', async (req, res) => {
  try {
    const { popularOrder } = req.body;

    await Product.updateMany({}, { popularOrder: 0 });

    for (let i = 0; i < popularOrder.length; i++) {
      await Product.findByIdAndUpdate(popularOrder[i], {
        popularOrder: popularOrder.length - i
      });
    }

    res.status(200).json({
      success: true,
      message: 'Popular products order updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Toggle new arrival status
router.put('/products/:id/toggle-new', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    product.isNew = !product.isNew;
    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

export default router;