give me in english. let me give you my backend all code
do not modify any functionality first
server.js
"

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aura_drapes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});"
utlis/cloudinary.js 
"import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: resourceType,
      upload_preset: 'aura_drapes_admin',
      quality: 100, // 100% quality
      fetch_format: 'auto',
      transformation: [
        { width: 800, height: 1067, crop: 'fill' },
        { quality: 100 },
        { format: 'webp' }
      ]
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

export default cloudinary;"
routes/admin.js 
"import express from 'express';
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

    const result = await uploadToCloudinary(image, resourceType);

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id
      }
    });
  } catch (error) {
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

export default router;"
auth.js
"import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id }, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
};

// Register admin/user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user'
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

export default router;:
products.js "import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, featured, popular, search, limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.isNew = true;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let products;
    
    if (popular === 'true') {
      products = await Product.find(query)
        .sort({ popularOrder: -1, createdAt: -1 })
        .limit(parseInt(limit));
    } else {
      products = await Product.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit));
    }

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

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

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

export default router;"
users.js "import express from 'express';
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

export default router;"
models/Products.js
"import mongoose from 'mongoose';

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
  timestamps: true
});

productSchema.index({ category: 1, isNew: 1, isActive: 1 });
productSchema.index({ popularOrder: -1 });

export default mongoose.model('Product', productSchema);"
User.js 
"import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);"
middleware/auth.js 
"import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};"
this is the full backend code
```