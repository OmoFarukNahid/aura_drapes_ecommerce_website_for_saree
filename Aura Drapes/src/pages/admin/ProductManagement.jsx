import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react'; // Add this import
import { useCategories } from '../../hooks/useCategories.js';
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

const { categories: dbCategories } = useCategories();
const categories = ['All', ...dbCategories];

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
    console.log('Additional image uploaded:', url);
    console.log('Current images array:', formData.images);

    if (formData.images.length < 6) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
      console.log('Image added to array');
    } else {
      console.log('Max 6 images reached');
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
                        uploadId="main"   // ← Unique ID
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

                    {/* Additional Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Images ({formData.images.length}/6)
                      </label>
                      <CloudinaryUpload
                        onUpload={handleAdditionalImageUpload}
                        existingImage={null}
                        resourceType="image"
                        buttonText={`Add Additional Images (${formData.images.length}/6)`}
                        multiple={true}  // ADD THIS LINE
                        uploadId="additional"   // ← Different unique ID
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
                  className={`p-2 rounded-full ${product.isNew
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

export default ProductManagement;