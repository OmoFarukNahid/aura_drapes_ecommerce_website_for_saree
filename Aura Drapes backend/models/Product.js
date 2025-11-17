import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    required: [true, 'Please provide category'],
    enum: ['Jamdani', 'Katan', 'Silk', 'Muslin', 'Cotton', 'Designer']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: 1000
  },
  image: {
    type: String,
    required: [true, 'Please provide image URL']
  },
  images: [{
    type: String
  }],
  video: {
    type: String
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0
  },
  specifications: {
    fabric: { type: String, default: '' },
    work: { type: String, default: '' },
    border: { type: String, default: '' },
    pallu: { type: String, default: '' },
    care: { type: String, default: 'Dry Clean Recommended' }
  },
  popularOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

productSchema.index({ category: 1, isNew: 1, isActive: 1 });
productSchema.index({ popularOrder: -1 });

export default mongoose.model('Product', productSchema);