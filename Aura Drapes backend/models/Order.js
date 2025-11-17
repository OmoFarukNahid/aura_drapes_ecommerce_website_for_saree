// backend/models/Order.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: () => `ORD-${Date.now().toString().slice(-6)}`
  },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    address: String,
    city: String,
    notes: String
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    default: 40
  },
  shippingArea: {
    type: String,
    enum: ['inside', 'outside'],
    default: 'inside'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'delivered', 'cash-collected'],
    default: 'pending'
  },
  cashCollected: {
    type: Number,
    default: 0
  },
  cashCollectedAt: Date,
  cashCollectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);