// backend/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50
  }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);