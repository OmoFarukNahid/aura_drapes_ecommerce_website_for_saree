// src/pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { categoriesAPI } from '../../services/api.js';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await categoriesAPI.getAll();
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      alert('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (id, currentName) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) return alert('Category name cannot be empty');
    
    try {
      await categoriesAPI.update(id, { name: editName.trim() });
      fetchCategories();
      setEditingId(null);
      setEditName('');
    } catch (err) {
      alert('Update failed');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Delete this category permanently?')) return;
    try {
      await categoriesAPI.delete(id);
      fetchCategories();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return alert('Enter category name');
    
    try {
      await categoriesAPI.create({ name: newCategory.trim() });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert('Failed to add category');
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage product categories</p>
        </div>
      </div>

      {/* Add New Category */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Category</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
            placeholder="Enter category name (e.g., Tangail Silk)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700"
          />
          <button
            onClick={addCategory}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 transition"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            All Categories ({categories.length})
          </h3>

          {categories.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No categories yet</p>
          ) : (
            <div className="space-y-3">
              {categories.map((cat) => (
                <motion.div
                  key={cat._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  {editingId === cat._id ? (
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="px-3 py-1 border rounded-md dark:bg-gray-800"
                        autoFocus
                      />
                      <button onClick={() => saveEdit(cat._id)} className="text-green-600 hover:text-green-700">
                        <Save size={20} />
                      </button>
                      <button onClick={cancelEdit} className="text-gray-600 hover:text-gray-800">
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startEdit(cat._id, cat.name)}
                          className="p-2 text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;