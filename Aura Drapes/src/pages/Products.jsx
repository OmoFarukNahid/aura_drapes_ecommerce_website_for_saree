import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Heart, ShoppingCart } from 'lucide-react'; // ADD Heart and ShoppingCart imports
import { useCategories } from '../hooks/useCategories.js';

const Products = ({ products, onAddToCart, onProductClick, selectedCategory, onCategoryChange }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { categories: dbCategories } = useCategories();
  const categories = ['All', ...dbCategories];

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
              className={`p-2 rounded-full transition-colors ${isAdding
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
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
                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                  }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${viewMode === 'list'
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
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" // Add this
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg'; // Add fallback
                    }}
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

export default Products;