import React, { useState, useEffect } from 'react';
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

export default PopularProductsManagement;