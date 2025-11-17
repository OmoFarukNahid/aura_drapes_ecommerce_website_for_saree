you have my full backend code, now i'll give you my frontend full code, do not change any functionality or colors, any things, just make sure it is connected with everything and backend and frontend work properly ,
Aura Drapes/
src/
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── Cart.jsx
│ ├── ProductCard.jsx
│ ├── AdminLayout.jsx
│ └── CloudinaryUpload.jsx
├── pages/
│ ├── Home.jsx
│ ├── Products.jsx
│ ├── ProductDetails.jsx
│ ├── Checkout.jsx
│ ├── About.jsx
│ └── admin/
│ ├── AdminLogin.jsx
│ ├── AdminDashboard.jsx
│ ├── ProductManagement.jsx
│ ├── NewArrivalsManagement.jsx
│ └── PopularProductsManagement.jsx
├── services/
│ └── api.js
├── App.jsx
├── main.jsx
└── index.css
"


"import React, { useState, useEffect } from 'react';
import { ShoppingCart, Moon, Sun, Menu, X, Search, User } from 'lucide-react';

const Navbar = ({ cartItems, toggleCart, isDarkMode, currentPage, navigateTo, navigateToHome, adminUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['Jamdani', 'Katan', 'Silk', 'Muslin', 'Cotton', 'Designer'];

  const handleNavigation = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    navigateTo('products', category);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
              onClick={navigateToHome}
            >
              Aura Drapes
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => handleNavigation('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('products')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'products' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                Products
              </button>
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                  Categories
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleNavigation('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'about' 
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                About
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Search size={20} />
            </button>

            {/* Admin Link (only show if admin is logged in) */}
            {adminUser && (
              <button
                onClick={() => handleNavigation('admin')}
                className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
              >
                <User size={16} />
                <span className="text-sm font-medium">Admin</span>
              </button>
            )}

            <button
              onClick={toggleCart}
              className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => handleNavigation('home')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('products')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                Products
              </button>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => handleNavigation('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                About
              </button>

              {/* Admin link in mobile menu */}
              {adminUser && (
                <button 
                  onClick={() => handleNavigation('admin')}
                  className="block w-full text-left px-3 py-2 text-green-600 hover:text-green-700 transition-colors"
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;"
"import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, User } from 'lucide-react';

const Footer = ({ adminUser }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Aura Drapes
            </h3>
            <p className="text-gray-300 mb-4">
              Experience the elegance of traditional Bangladeshi sharees with modern sophistication. 
              Each piece tells a story of craftsmanship and heritage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@auradrapes.com</span>
              </div>
            </div>

            {/* Admin Panel Link */}
            {adminUser && (
              <div className="mt-6 pt-4 border-t border-gray-700">
                <a 
                  href="#admin"
                  className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                >
                  <User size={16} />
                  <span className="font-medium">Admin Panel</span>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aura Drapes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;"
'import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Video, Loader } from 'lucide-react';
import { uploadAPI } from '../services/api.js';

const CloudinaryUpload = ({ onUpload, existingImage, resourceType = 'image', buttonText = 'Upload Image' }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    
    const maxSize = resourceType === 'image' ? 5 * 1024 * 1024 : 50 * 1024 * 1024; // 5MB for images, 50MB for videos

    if (resourceType === 'image' && !validImageTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, WebP)');
      return;
    }

    if (resourceType === 'video' && !validVideoTypes.includes(file.type)) {
      alert('Please select a valid video file (MP4, WebM, OGG)');
      return;
    }

    if (file.size > maxSize) {
      alert(`File size too large. Maximum size is ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64 = reader.result;
        
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        try {
          const response = await uploadAPI.uploadImage({
            image: base64,
            resourceType
          });

          clearInterval(progressInterval);
          setProgress(100);

          if (response.data.success) {
            onUpload(response.data.data.url);
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Upload failed. Please try again.');
        } finally {
          setUploading(false);
          setTimeout(() => setProgress(0), 1000);
        }
      };

      reader.onerror = () => {
        setUploading(false);
        alert('Error reading file');
      };

    } catch (error) {
      setUploading(false);
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div className="flex items-center space-x-4">
        <input
          type="file"
          id={`upload-${resourceType}`}
          accept={resourceType === 'image' ? 'image/*' : 'video/*'}
          onChange={handleFileUpload}
          className="hidden"
          disabled={uploading}
        />
        <motion.label
          htmlFor={`upload-${resourceType}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold cursor-pointer transition-colors ${
            uploading
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {uploading ? (
            <Loader size={20} className="animate-spin" />
          ) : resourceType === 'image' ? (
            <ImageIcon size={20} />
          ) : (
            <Video size={20} />
          )}
          <span>
            {uploading ? 'Uploading...' : buttonText}
          </span>
        </motion.label>

        {existingImage && !uploading && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            ✓ Image uploaded
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
        <p>
          <strong>Recommended:</strong> {resourceType === 'image' ? 'WebP format' : 'MP4 format'}
        </p>
        <p>
          <strong>Max size:</strong> {resourceType === 'image' ? '5MB' : '50MB'}
        </p>
        <p>
          <strong>Aspect ratio:</strong> 3:4 (portrait) for best results
        </p>
        {resourceType === 'image' && (
          <p>
            <strong>Dimensions:</strong> 800×1067px or higher
          </p>
        )}
      </div>
    </div>
  );
};

export default CloudinaryUpload;"
"import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, navigateToCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleProceedToCheckout = () => {
    onClose(); // Close cart first
    setTimeout(() => {
      navigateToCheckout(); // Then navigate to checkout
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <ShoppingBag size={24} />
                <h2 className="text-xl font-semibold dark:text-white">Your Cart</h2>
                <span className="bg-purple-600 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-purple-600 font-semibold">BDT {item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 dark:bg-gray-700"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold dark:text-white">
                  <span>Total:</span>
                  <span>BDT {totalPrice}</span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;"
"import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Star, 
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { authAPI } from '../services/api.js';

const AdminLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'New Arrivals', href: '/admin/new-arrivals', icon: Star },
    { name: 'Popular Products', href: '/admin/popular', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authAPI.logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: sidebarOpen ? 0 : -280 
        }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl lg:static lg:inset-0 lg:translate-x-0 transition-transform duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aura Drapes
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = window.location.pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <User className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <LogOut size={16} />
            <span className="font-medium">
              {loggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Admin Panel
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  View Website →
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;"
"import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Star, X, Upload, Image as ImageIcon
} from 'lucide-react';
import { productsAPI, uploadAPI } from '../../services/api.js';
import CloudinaryUpload from '../../components/CloudinaryUpload.jsx';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Jamdani',
    price: '',
    description: '',
    image: '',
    images: [],
    video: '',
    isNew: false,
    stock: 0,
    specifications: {
      fabric: '',
      work: '',
      border: '',
      pallu: '',
      care: ''
    }
  });

  const categories = ['All', 'Jamdani', 'Katan', 'Silk', 'Muslin', 'Cotton', 'Designer'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('specifications.')) {
      const specField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
  };

  const handleAdditionalImageUpload = (url) => {
    if (formData.images.length < 6) { // Max 6 additional images
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
    }
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productsAPI.update(editingProduct._id, formData);
      } else {
        await productsAPI.create(formData);
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Jamdani',
      price: '',
      description: '',
      image: '',
      images: [],
      video: '',
      isNew: false,
      stock: 0,
      specifications: {
        fabric: '',
        work: '',
        border: '',
        pallu: '',
        care: ''
      }
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const editProduct = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      images: product.images || [],
      video: product.video || '',
      isNew: product.isNew,
      stock: product.stock || 0,
      specifications: product.specifications || {
        fabric: '',
        work: '',
        border: '',
        pallu: '',
        care: ''
      }
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const toggleNewStatus = async (product) => {
    try {
      await productsAPI.toggleNew(product._id);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling new status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Product Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your product catalog</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {categories.filter(cat => cat !== 'All').map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Price (BDT) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isNew"
                        checked={formData.isNew}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                      />
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mark as New Arrival
                      </label>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Main Image *
                      </label>
                      <CloudinaryUpload
                        onUpload={handleImageUpload}
                        existingImage={formData.image}
                        resourceType="image"
                      />
                      {formData.image && (
                        <div className="mt-2">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Images ({formData.images.length}/6)
                      </label>
                      <CloudinaryUpload
                        onUpload={handleAdditionalImageUpload}
                        resourceType="image"
                        buttonText="Add Additional Image"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Additional ${index + 1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeAdditionalImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(formData.specifications).map(spec => (
                    <div key={spec}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {spec.charAt(0).toUpperCase() + spec.slice(1)}
                      </label>
                      <input
                        type="text"
                        name={`specifications.${spec}`}
                        value={formData.specifications[spec]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative">
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.isNew && (
                <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium">
                  New
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => toggleNewStatus(product)}
                  className={`p-2 rounded-full ${
                    product.isNew 
                      ? 'bg-yellow-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Star size={16} className={product.isNew ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                {product.category}
              </p>
              <p className="text-purple-600 font-bold text-lg mb-4">
                BDT {product.price.toLocaleString()}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Stock: {product.stock || 0}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editProduct(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No products found
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;"
"import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical, Star, Save, X } from 'lucide-react';
import { productsAPI } from '../../services/api.js';

const PopularProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [popularOrder, setPopularOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      const allProducts = response.data.data || [];
      setProducts(allProducts);

      // Get current popular products in order
      const popularProducts = allProducts
        .filter(p => p.popularOrder > 0)
        .sort((a, b) => b.popularOrder - a.popularOrder);
      
      setPopularOrder(popularProducts.map(p => p._id));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToPopular = (productId) => {
    if (!popularOrder.includes(productId) && popularOrder.length < 12) {
      setPopularOrder(prev => [productId, ...prev]);
    }
  };

  const removeFromPopular = (productId) => {
    setPopularOrder(prev => prev.filter(id => id !== productId));
  };

  const savePopularOrder = async () => {
    setSaving(true);
    try {
      await productsAPI.updatePopularOrder(popularOrder);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving popular order:', error);
    } finally {
      setSaving(false);
    }
  };

  const availableProducts = products.filter(
    product => !popularOrder.includes(product._id)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Popular Products</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Drag to reorder popular products (max 12)
          </p>
        </div>
        <div className="flex space-x-4">
          {saved && (
            <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg">
              Order saved successfully!
            </div>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={savePopularOrder}
            disabled={saving}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{saving ? 'Saving...' : 'Save Order'}</span>
          </motion.button>
        </div>
      </div>

      {/* Popular Products List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Popular Products Order ({popularOrder.length}/12)
        </h2>

        {popularOrder.length === 0 ? (
          <div className="text-center py-12">
            <Star size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No popular products selected</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Add products from the list below
            </p>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={popularOrder}
            onReorder={setPopularOrder}
            className="space-y-3"
          >
            {popularOrder.map((productId, index) => {
              const product = products.find(p => p._id === productId);
              if (!product) return null;

              return (
                <Reorder.Item
                  key={productId}
                  value={productId}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="text-gray-400 flex-shrink-0" size={20} />
                  <span className="text-lg font-bold text-purple-600 w-8 flex-shrink-0">
                    #{index + 1}
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category} • BDT {product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromPopular(productId)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        )}
      </div>

      {/* Available Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Available Products ({availableProducts.length})
        </h2>

        {availableProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No available products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.category} • BDT {product.price}
                  </p>
                </div>
                <button
                  onClick={() => addToPopular(product._id)}
                  disabled={popularOrder.length >= 12}
                  className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Star size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularProductsManagement;"
"import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import { productsAPI } from '../../services/api.js';

const NewArrivalsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNewStatus = async (product) => {
    try {
      await productsAPI.toggleNew(product._id);
      // Update local state immediately for better UX
      setProducts(prev => prev.map(p => 
        p._id === product._id ? { ...p, isNew: !p.isNew } : p
      ));
    } catch (error) {
      console.error('Error toggling new status:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newArrivals = filteredProducts.filter(p => p.isNew);
  const otherProducts = filteredProducts.filter(p => !p.isNew);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">New Arrivals</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage products featured in New Arrivals section</p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Current New Arrivals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Current New Arrivals ({newArrivals.length})
        </h2>
        
        {newArrivals.length === 0 ? (
          <div className="text-center py-8">
            <Star size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No new arrivals selected</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newArrivals.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.category} • BDT {product.price}
                  </p>
                </div>
                <button
                  onClick={() => toggleNewStatus(product)}
                  className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                >
                  <ToggleRight size={24} className="fill-current" />
                  <span className="text-sm font-medium">ON</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Other Products */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          All Products ({otherProducts.length})
        </h2>
        
        {otherProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No other products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.category} • BDT {product.price}
                  </p>
                </div>
                <button
                  onClick={() => toggleNewStatus(product)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <ToggleLeft size={24} />
                  <span className="text-sm font-medium">OFF</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivalsManagement;"
"import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { authAPI } from '../../services/api.js';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      if (response.data.success) {
        onLogin(response.data.user);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Aura Drapes
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Admin Panel</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="admin@auradrapes.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Contact super admin for account access
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;"
"import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  ShoppingBag, Users, DollarSign, TrendingUp, 
  Package, Star, Clock, AlertCircle 
} from 'lucide-react';
import { productsAPI } from '../../services/api.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    newArrivals: 0,
    popularProducts: 0,
    totalRevenue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [productsRes] = await Promise.all([
        productsAPI.getAll()
      ]);

      const products = productsRes.data.data || [];
      
      setStats({
        totalProducts: products.length,
        newArrivals: products.filter(p => p.isNew).length,
        popularProducts: products.filter(p => p.popularOrder > 0).length,
        totalRevenue: products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0)
      });

      setRecentProducts(products.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: ShoppingBag,
      color: 'purple'
    },
    {
      title: 'New Arrivals',
      value: stats.newArrivals,
      icon: Star,
      color: 'pink'
    },
    {
      title: 'Popular Items',
      value: stats.popularProducts,
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Inventory Value',
      value: `BDT ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'green'
    }
  ];

  const categoryData = [
    { name: 'Jamdani', value: 25 },
    { name: 'Katan', value: 20 },
    { name: 'Silk', value: 15 },
    { name: 'Muslin', value: 15 },
    { name: 'Cotton', value: 15 },
    { name: 'Designer', value: 10 }
  ];

  const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to Aura Drapes Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Products
          </h3>
          <div className="space-y-4">
            {recentProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.category} • BDT {product.price}
                  </p>
                </div>
                {product.isNew && (
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Product', icon: Package, href: '/admin/products/new' },
            { label: 'Manage Products', icon: ShoppingBag, href: '/admin/products' },
            { label: 'New Arrivals', icon: Star, href: '/admin/new-arrivals' },
            { label: 'Popular Items', icon: TrendingUp, href: '/admin/popular' }
          ].map((action, index) => (
            <motion.a
              key={action.label}
              href={action.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <action.icon className="text-purple-600 mb-2" size={24} />
              <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                {action.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;"
"import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart, ShoppingCart } from 'lucide-react'; // ADD Heart and ShoppingCart imports

const Products = ({ products, onAddToCart, onProductClick, selectedCategory, onCategoryChange }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Jamdani', 'Katan', 'Silk', 'Muslin', 'Cotton', 'Designer'];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'new':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, selectedCategory, priceRange, sortBy]);

  // Optimized Product Card with fixed aspect ratio
  const ProductCard = ({ product, onAddToCart, onProductClick }) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e) => {
      e.stopPropagation();
      setIsAdding(true);
      await onAddToCart(product);
      setTimeout(() => setIsAdding(false), 1000);
    };

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
        onClick={() => onProductClick(product)}
      >
        {/* Fixed Aspect Ratio Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Action Buttons - Always visible on mobile */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>
          
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium shadow">
              New
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.category}</p>
          <div className="flex justify-between items-center">
            <span className="text-purple-600 font-bold text-lg">BDT {product.price.toLocaleString()}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`p-2 rounded-full transition-colors ${
                isAdding 
                  ? 'bg-green-600 text-white' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isAdding ? '✓' : <ShoppingCart size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {selectedCategory === 'All' ? 'Our Collection' : selectedCategory + ' Collection'}
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {selectedCategory === 'All' 
              ? 'Discover our exquisite collection of traditional Bangladeshi sharees, each piece crafted with precision and passion.'
              : `Explore our beautiful ${selectedCategory} sharees collection`
            }
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode */}
            <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm shadow focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="new">New Arrivals</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm shadow hover:shadow-md transition-all"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range: BDT {priceRange[0].toLocaleString()} - BDT {priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>BDT 0</span>
                  <span>BDT 50,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        {viewMode === 'grid' ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <div className="w-24 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{product.category}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{product.description}</p>
                  <p className="text-purple-600 font-bold text-lg">BDT {product.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                onCategoryChange('All');
                setPriceRange([0, 50000]);
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;"
"import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetails = ({ product, onAddToCart, onNavigateBack, onDirectOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [customizationNotes, setCustomizationNotes] = useState('');

  if (!product) {
    return (
      <div className="pt-20 min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Product not found</p>
          <button
            onClick={onNavigateBack}
            className="mt-4 text-purple-600 hover:text-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
  ];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    const productWithDetails = {
      ...product,
      quantity,
      customizationNotes: customizationNotes.trim() || undefined
    };

    await onAddToCart(productWithDetails);

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleOrderNow = () => {
    // Create order data WITHOUT adding to cart
    const orderData = {
      product: {
        ...product,
        quantity,
        customizationNotes: customizationNotes.trim() || undefined
      },
      customerInfo: {}, // Will be filled in checkout
      total: product.price * quantity
    };

    // Use the new direct order function
    if (onDirectOrder) {
      onDirectOrder(orderData);
    } else {
      // Fallback: navigate to checkout
      window.location.hash = 'checkout';
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Optional: Add to favorites functionality
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onNavigateBack}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - Fixed Frame */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <img
                src={productImages[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-1 aspect-[3/4] overflow-hidden rounded-lg border-2 transition-colors ${activeImage === index
                      ? 'border-purple-600'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-400'
                    }`}
                >
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700">
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Category: {product.category}
                </p>
                <p className="text-3xl font-bold text-purple-600 mb-4">
                  BDT {product.price.toLocaleString()}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-3 rounded-full transition-colors ${isLiked
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
              >
                <Heart
                  size={24}
                  className={isLiked ? 'fill-current' : ''}
                />
              </motion.button>
            </div>

            {/* Availability */}
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="font-medium">In Stock</span>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <strong>Fabric:</strong> Premium Quality {product.category}
                </div>
                <div>
                  <strong>Work:</strong> Handcrafted Traditional Design
                </div>
                <div>
                  <strong>Border:</strong> Intricate Pattern
                </div>
                <div>
                  <strong>Pallu:</strong> Elaborate Weaving
                </div>
                <div className="md:col-span-2">
                  <strong>Care:</strong> Dry Clean Recommended
                </div>
              </div>
            </div>

            {/* Customization Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Customization Notes (Optional)
              </h3>
              <textarea
                value={customizationNotes}
                onChange={(e) => setCustomizationNotes(e.target.value)}
                placeholder="Any special requirements or customization preferences..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none transition-colors"
              />
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quantity:
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-4 px-8 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${isAddingToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                >
                  <ShoppingCart size={20} />
                  <span>{isAddingToCart ? '✓ ADDED!' : 'ADD TO CART'}</span>
                </motion.button>

                <motion.button
                  onClick={handleOrderNow}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  ORDER NOW
                </motion.button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <Truck className="text-purple-600" size={24} />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Over BDT 5000</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="text-purple-600" size={24} />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">100% Protected</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <RotateCcw className="text-purple-600" size={24} />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">7 Days Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;"
"import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
} from 'lucide-react';

const Home = ({
  onShopNow,
  products,
  onAddToCart,
  onProductClick,
  onCategoryNavigation,
  loading,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  // Real data from MongoDB
  const newArrivals = products.filter((p) => p.isNew);

  // Use real popularOrder field from DB (highest number = most popular)
  const popularProducts = [...products]
    .filter((p) => p.popularOrder && p.popularOrder > 0)
    .sort((a, b) => (b.popularOrder || 0) - (a.popularOrder || 0))
    .slice(0, 8);

  // Slider controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);
  };

  // Horizontal scroll
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Product Card (Beautiful & Optimized)
  const ProductCard = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = async (e) => {
      e.stopPropagation();
      setIsAdding(true);
      await onAddToCart(product);
      setTimeout(() => setIsAdding(false), 1000);
    };

    const handleLike = (e) => {
      e.stopPropagation();
      setIsLiked(!isLiked);
    };

    return (
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 flex-none w-80"
        onClick={() => onProductClick(product)}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Like Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full shadow-lg backdrop-blur-sm ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 hover:bg-white'
              }`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            </motion.button>
          </div>

          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              New
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {product.category}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-purple-600">
              ৳{product.price?.toLocaleString()}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`p-3 rounded-full transition-all ${
                isAdding
                  ? 'bg-green-600 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
              }`}
            >
              {isAdding ? '✓' : <ShoppingCart size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Embrace Elegance with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aura Drapes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Discover the perfect blend of traditional craftsmanship and contemporary design
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={onShopNow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
          >
            Shop Collection
            <ArrowRight className="ml-3" size={24} />
          </motion.button>
        </div>
      </section>

      {/* NEW ARRIVALS SLIDER */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                New Arrivals
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Fresh from our artisans – exclusively for you
              </p>
            </div>

            <div className="relative">
              {newArrivals.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-96 md:h-[600px]"
                >
                  {newArrivals.map((product, idx) => (
                    <div
                      key={product._id || product.id}
                      className={`absolute inset-0 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-6 left-6 bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-bold shadow-xl">
                            Just Arrived
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900 p-10 flex flex-col justify-center">
                          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            {product.name}
                          </h3>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            {product.description || "Handcrafted with love using premium silk and traditional weaving techniques"}
                          </p>
                          <div className="flex items-center gap-8 mb-8">
                            <span className="text-4xl font-bold text-purple-600">
                              ৳{product.price?.toLocaleString()}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={28} className="text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => onAddToCart(product)}
                              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-3"
                            >
                              <ShoppingCart size={24} />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => onProductClick(product)}
                              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots */}
              {newArrivals.length > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  {newArrivals.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`transition-all duration-300 ${
                        i === currentSlide
                          ? 'bg-purple-600 w-12 h-3 rounded-full'
                          : 'bg-gray-400 w-3 h-3 rounded-full'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* POPULAR PRODUCTS */}
      {popularProducts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
                  Popular Now
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Trending among our lovely customers
                </p>
              </div>
              <button
                onClick={onShopNow}
                className="mt-6 md:mt-0 text-purple-600 hover:text-purple-700 font-bold text-lg flex items-center gap-2"
              >
                See All <ArrowRight size={24} />
              </button>
            </div>

            <div className="relative">
              {/* Scroll Buttons */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all hidden lg:block"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all hidden lg:block"
              >
                <ChevronRight size={32} />
              </button>

              {/* Products Grid */}
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {popularProducts.map((product, index) => (
                  <motion.div
                    key={product._id || product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile See More */}
            <div className="text-center mt-10 lg:hidden">
              <button
                onClick={onShopNow}
                className="bg-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-purple-700 transition-all"
              >
                Explore All Products
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;"
"import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MessageCircle, PhoneCall } from 'lucide-react';

const Checkout = ({ cartItems, updateQuantity, removeFromCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const [shippingArea, setShippingArea] = useState('inside'); // 'inside' or 'outside'

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = shippingArea === 'inside' ? 40 : 70;
  const finalTotal = totalPrice + shippingCost;

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
      alert('Please fill in all required fields (Name, Phone, Address, City)');
      return;
    }

    const shippingText = shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka';

    // Prepare WhatsApp message
    const whatsappMessage = `Hello Aura Drapes! I would like to place an order.%0A%0A*Customer Details:*%0A*Name:* ${customerInfo.name}%0A*Phone:* ${customerInfo.phone}%0A*Email:* ${customerInfo.email || 'Not provided'}%0A*Address:* ${customerInfo.address}, ${customerInfo.city}%0A*Shipping:* ${shippingText} (BDT ${shippingCost})%0A%0A*Order Items:*%0A${cartItems.map(item => `- ${item.name} (BDT ${item.price}) x ${item.quantity}`).join('%0A')}%0A%0A*Subtotal:* BDT ${totalPrice}%0A*Shipping:* BDT ${shippingCost}%0A*Total Amount:* BDT ${finalTotal}%0A*Payment:* Cash on Delivery%0A*Notes:* ${customerInfo.notes || 'None'}`;

    // Open WhatsApp
    window.open(`https://wa.me/8801796272950?text=${whatsappMessage}`, '_blank');
    
    alert('Order submitted! You will be redirected to WhatsApp to confirm your order.');
  };

  const handleCall = () => {
    window.open('tel:+8801796272950', '_self');
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <a
            href="#products"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <a
          href="#products"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Shopping
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        BDT {item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      BDT {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="text-gray-900 dark:text-white">BDT {totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Shipping ({shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                <span className="text-gray-900 dark:text-white">BDT {shippingCost}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                <span>Total</span>
                <span className="text-purple-600">BDT {finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Customer Information + Shipping + Payment */}
          <div className="space-y-6">
            {/* Customer Info Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Customer Information
              </h2>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                      placeholder="01XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="House no, road, area..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="e.g. Dhaka, Chittagong"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                {/* Shipping Area Selection */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Shipping Area
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-600 has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50 dark:has-[:checked]:bg-purple-900/20">
                      <input
                        type="radio"
                        name="shipping"
                        value="inside"
                        checked={shippingArea === 'inside'}
                        onChange={(e) => setShippingArea(e.target.value)}
                        className="text-purple-600 focus:ring-purple-600"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 dark:text-white">Inside Dhaka</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Delivery within Dhaka city</p>
                      </div>
                      <span className="font-bold text-purple-600">৳40.00</span>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-600 has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50 dark:has-[:checked]:bg-purple-900/20">
                      <input
                        type="radio"
                        name="shipping"
                        value="outside"
                        checked={shippingArea === 'outside'}
                        onChange={(e) => setShippingArea(e.target.value)}
                        className="text-purple-600 focus:ring-purple-600"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 dark:text-white">Outside Dhaka</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Delivery outside Dhaka</p>
                      </div>
                      <span className="font-bold text-purple-600">৳70.00</span>
                    </label>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6 -mx-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Payment Method
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border-2 border-purple-600 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        checked
                        readOnly
                        className="text-purple-600 focus:ring-purple-600"
                      />
                      <label htmlFor="cod" className="flex items-center space-x-2 text-gray-900 dark:text-white cursor-pointer">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">৳</span>
                        </div>
                        <span className="font-semibold">Cash on Delivery</span>
                      </label>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                        <strong>Note:</strong> Pay with cash when your order is delivered. 
                        Our delivery executive will collect the payment at your doorstep.
                      </p>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="/privacy" className="text-purple-600 underline">privacy policy</a>.
                    </p>
                  </div>
                </div>

                {/* Contact Options + Confirm Button */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                    Prefer to order via call?
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <motion.button
                      type="button"
                      onClick={handleCall}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex-1"
                    >
                      <PhoneCall size={20} />
                      <span>Call to Order</span>
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:shadow-lg transition-all flex-1"
                    >
                      অর্ডার Confirm করুন
                    </motion.button>
                  </div>
                  
                  <div className="text-xs text-purple-700 dark:text-purple-400 space-y-1">
                    <p>• We'll contact you within 24 hours to confirm details</p>
                    <p>• Payment: Cash on Delivery</p>
                    <p>• Delivery charge applied as per area</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;"
"import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aura Drapes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Where tradition meets contemporary elegance. We bring you the finest collection 
            of Bangladeshi sharees, crafted with love and heritage.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded with a passion for preserving and promoting the rich textile heritage 
                of Bangladesh, Aura Drapes brings you authentic, handcrafted sharees that 
                tell a story of tradition, craftsmanship, and elegance.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each piece in our collection is carefully selected from skilled artisans 
                across the country, ensuring that you receive not just a garment, but a 
                piece of cultural heritage.
              </p>
              <div className="flex items-center space-x-2 text-purple-600">
                <Heart size={20} className="fill-current" />
                <span className="font-semibold">Crafted with Love, Worn with Pride</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.prismic.io/milanmagic/86810a8a-e8fe-4d86-9fb5-2a16d08961e1_Banarasi+saree+12.jpg?auto=compress,format&rect=0,0,800,1100&w=740&h=1018&fit=crop"
                alt="Traditional Weaving"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://cfw51.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibXltYW5kYXAuaW4iLCJ2IjozNTA3MDAwMTg5LCJyIjoxLCJpIjoiN2EyYTIwN2MtYmFiMi00OGEzLWNhYjktYjRjNTBhMDhlMjAwIn0/wp-content/uploads/2022/02/Intro-to-Cotton.jpg&fit=crop"
                alt="Sharee Collection"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We'd love to hear from you. Reach out to us through any of these channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Available 10AM - 8PM
              </p>
              <a
                href="tel:+8801XXXXXXXXX"
                className="text-purple-600 hover:text-purple-700 font-semibold text-lg"
              >
                +880 1XXX-XXXXXX
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Email Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We'll respond quickly
              </p>
              <a
                href="mailto:info@auradrapes.com"
                className="text-purple-600 hover:text-purple-700 font-semibold text-lg"
              >
                info@auradrapes.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Showroom location
              </p>
              <p className="text-purple-600 font-semibold">
                Dhaka, Bangladesh
              </p>
            </motion.div>
          </div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="text-purple-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Business Hours
              </h3>
            </div>
            <div className="space-y-2 text-center">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Monday - Friday:</span>
                <span className="font-semibold text-gray-900 dark:text-white">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Saturday - Sunday:</span>
                <span className="font-semibold text-gray-900 dark:text-white">11:00 AM - 6:00 PM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;"
services/api.js "import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getNewArrivals: () => api.get('/products', { params: { featured: 'true' } }),
  getPopular: () => api.get('/products', { params: { popular: 'true', limit: 12 } }),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export default api;"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import NewArrivalsManagement from './pages/admin/NewArrivalsManagement';
import PopularProductsManagement from './pages/admin/PopularProductsManagement';
import AdminLayout from './components/AdminLayout';
import { authAPI, productsAPI } from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  // Auto dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Fetch products on app load
  useEffect(() => {
    fetchProducts();
    checkAdminAuth();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminAuth = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.data.success && response.data.user.role === 'admin') {
        setAdminUser(response.data.user);
      }
    } catch (error) {
      console.log('Not authenticated as admin');
    } finally {
      setAdminLoading(false);
    }
  };

  // CART FUNCTIONS
  const addToCart = (product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // NAVIGATION HELPERS
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const navigateTo = (page, category = 'All') => {
    setCurrentPage(page);
    if (category) setSelectedCategory(category);
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedCategory('All');
  };

  const navigateToProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const navigateBack = () => {
    setSelectedProduct(null);
    setCurrentPage('products');
  };

  const navigateToCheckout = () => {
    setCurrentPage('checkout');
    setIsCartOpen(false);
  };

  // ADMIN FUNCTIONS
  const handleAdminLogin = (user) => {
    setAdminUser(user);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setCurrentPage('home');
  };

  const handleDirectOrder = (orderData) => {
    setCartItems([orderData.product]);
    setCurrentPage('checkout');
  };

  // RENDER PAGE
  const renderPage = () => {
    // Admin routes
    if (currentPage.startsWith('admin')) {
      if (adminLoading) {
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        );
      }

      if (!adminUser && currentPage !== 'admin-login') {
        return <AdminLogin onLogin={handleAdminLogin} />;
      }

      if (adminUser && currentPage === 'admin-login') {
        setCurrentPage('admin');
        return null;
      }

      const adminContent = {
        'admin': <AdminDashboard />,
        'admin-products': <ProductManagement />,
        'admin-new-arrivals': <NewArrivalsManagement />,
        'admin-popular': <PopularProductsManagement />,
        'admin-login': <AdminLogin onLogin={handleAdminLogin} />
      }[currentPage] || <AdminDashboard />;

      if (currentPage === 'admin-login') {
        return adminContent;
      }

      return (
        <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
          {adminContent}
        </AdminLayout>
      );
    }

    // Customer routes
    switch (currentPage) {
      case 'product-details':
        return (
          <ProductDetails 
            product={selectedProduct}
            onAddToCart={addToCart}
            onNavigateBack={navigateBack}
            onDirectOrder={handleDirectOrder}
          />
        );
      case 'products':
        return (
          <Products 
            products={products}
            onAddToCart={addToCart}
            onProductClick={navigateToProductDetails}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            loading={loading}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        );
      case 'about':
        return <About />;
      default:
        return (
          <Home 
            onShopNow={() => navigateTo('products')} 
            products={products}
            onAddToCart={addToCart}
            onProductClick={navigateToProductDetails}
            onCategoryNavigation={navigateTo}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Only show Navbar & Footer for customer pages */}
      {!currentPage.startsWith('admin') && (
        <Navbar
          cartItems={cartItems}
          toggleCart={toggleCart}
          isDarkMode={isDarkMode}
          currentPage={currentPage}
          navigateTo={navigateTo}
          navigateToHome={navigateToHome}
          adminUser={adminUser}
        />
      )}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {/* Only show Footer for customer pages */}
      {!currentPage.startsWith('admin') && (
        <Footer adminUser={adminUser} />
      )}
      
      {/* Cart for customer pages */}
      {!currentPage.startsWith('admin') && (
        <Cart
          isOpen={isCartOpen}
          onClose={toggleCart}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          navigateToCheckout={navigateToCheckout}
        />
      )}
    </div>
  );
}

export default App;
now tell me where to eidt, if no need then dont have to give full code just tell me the specific where to change in the code. 
```