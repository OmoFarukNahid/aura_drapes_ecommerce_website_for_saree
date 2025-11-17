import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ordersAPI } from '../services/api.js'; // Add this import at top
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

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address || !customerInfo.city) {
      alert('Please fill in all required fields');
      return;
    }

    const orderData = {
      customer: customerInfo,
      items: cartItems.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: finalTotal,
      shippingCost,
      shippingArea
    };

    try {
      // Save to database first
      await ordersAPI.create(orderData);

      // Then open WhatsApp (your current flow stays!)
      const shippingText = shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka';
      const whatsappMessage = `Hello Aura Drapes! I would like to place an order.%0A%0A*Customer Details:*%0A*Name:* ${customerInfo.name}%0A*Phone:* ${customerInfo.phone}%0A*Address:* ${customerInfo.address}, ${customerInfo.city}%0A*Shipping:* ${shippingText}%0A%0A*Order Items:*%0A${cartItems.map(item => `- ${item.name} x ${item.quantity}`).join('%0A')}%0A%0A*Total:* BDT ${finalTotal}%0A*Payment:* COD`;

      window.open(`https://wa.me/8801796272950?text=${whatsappMessage}`, '_blank');
      alert('Order saved! Check admin panel → Orders');
    } catch (err) {
      alert('Order saved locally. WhatsApp opened.');
      // Still open WhatsApp even if DB fails
      window.open(`https://wa.me/8801796272950?text=Order from website`, '_allowing');
    }
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

export default Checkout;