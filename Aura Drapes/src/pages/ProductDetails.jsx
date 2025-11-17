import React, { useState } from 'react';
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

  const productImages = product.images && product.images.length > 0
    ? [product.image, ...product.images]  // Main image + additional images
    : [product.image];  // Fallback to just main image if no additional images

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
                  className={`flex-1 aspect-[3/4] overflow-hidden rounded-lg border-2 transition-colors max-w-32 ${activeImage === index
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

export default ProductDetails;