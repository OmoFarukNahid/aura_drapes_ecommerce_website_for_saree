import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This is IMPORTANT for cookies
  timeout: 10000,
});
// Add these
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`),  // ← THIS LINE MUST EXIST
};

export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
};

// Request interceptor - ADD DEBUGGING
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request to:', config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - ADD DEBUGGING
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received from:', response.config.url);
    console.log('📦 Response data:', response.data);

    // Check if Set-Cookie header is present
    if (response.headers['set-cookie']) {
      console.log('🍪 Set-Cookie header:', response.headers['set-cookie']);
    }

    return response;
  },
  (error) => {
    console.log('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message
    });
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getNewArrivals: () => api.get('/products', { params: { featured: 'true' } }),
  getPopular: () => api.get('/products', { params: { popular: 'true', limit: 12 } }),

  // Admin product functions
  create: (productData) => api.post('/admin/products', productData),
  update: (id, productData) => api.put(`/admin/products/${id}`, productData),
  delete: (id) => api.delete(`/admin/products/${id}`),
  toggleNew: (id) => api.put(`/admin/products/${id}/toggle-new`),
  updatePopularOrder: (popularOrder) => api.put('/admin/popular-order', { popularOrder }),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// Upload API
export const uploadAPI = {
  uploadImage: (data) => api.post('/admin/upload', data),
};

export default api;