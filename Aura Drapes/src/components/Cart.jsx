import React from 'react';
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

export default Cart;