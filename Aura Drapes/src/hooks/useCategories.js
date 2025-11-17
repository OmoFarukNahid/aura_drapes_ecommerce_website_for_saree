// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import { categoriesAPI } from '../services/api.js';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);  // ← Removed the "-"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesAPI.getAll();
        if (res.data.success) {
          setCategories(res.data.data.map(cat => cat.name));
        }
      } catch (err) {
        console.error('Failed to load categories');
        // Fallback if API fails
        setCategories(['Jamdani', 'Katan', 'Silk', 'Muslin', 'Cotton', 'Designer']);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};