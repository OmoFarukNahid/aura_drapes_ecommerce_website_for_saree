import React, { useState, useEffect } from 'react';
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

export default NewArrivalsManagement;