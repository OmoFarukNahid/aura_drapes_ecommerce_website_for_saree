// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, Package } from 'lucide-react';
import { productsAPI, ordersAPI, categoriesAPI } from '../../services/api.js';
import { useCategories } from '../../hooks/useCategories.js';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    newArrivals: 0,
    popularProducts: 0,
  });
  const [products, setProducts] = useState([]);           // ← Fixed: now in state
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categories: liveCategories } = useCategories(); // ← ADD THIS LINE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, categoriesRes] = await Promise.all([
          productsAPI.getAll(),
          ordersAPI.getAll().catch(() => ({ data: { success: true, data: [] } })),
          categoriesAPI.getAll().catch(() => ({ data: { success: true, data: [] } }))
        ]);

        const productsData = productsRes.data.data || [];

        setProducts(productsData); // ← Save full products list
        setRecentProducts(productsData.slice(0, 5));

        setStats({
          totalProducts: productsData.length,
          newArrivals: productsData.filter(p => p.isNew).length,
          popularProducts: productsData.filter(p => p.popularOrder > 0).length,
        });

        setRecentOrders((ordersRes.data.data || []).slice(0, 5));
        setCategories(categoriesRes.data.data || []);

      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Products', value: stats.totalProducts, icon: ShoppingBag, color: 'purple' },
    { title: 'New Arrivals', value: stats.newArrivals, icon: Star, color: 'pink' },
    { title: 'Popular Items', value: stats.popularProducts, icon: TrendingUp, color: 'blue' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome to Aura Drapes Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders + Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No orders yet</p>
            ) : (
              recentOrders.map(order => (
                <div
                  key={order._id}
                  onClick={() => window.location.hash = 'admin-orders'}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-purple-600">
                        Order #{order.orderId || order._id.slice(-6)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString('en-BD')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">৳{order.totalAmount.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'cash-collected' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                        } dark:text-white`}>
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm space-y-1 border-t pt-2">
                    <p className="font-medium">{order.customer.name} • {order.customer.phone}</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="truncate max-w-[180px]">{item.name}</span>
                        <span className="text-gray-600">× {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
            {recentOrders.length > 0 && (
              <button
                onClick={() => window.location.hash = 'admin-orders'}
                className="w-full text-center text-purple-600 hover:text-purple-700 text-sm font-medium mt-4"
              >
                View all orders →
              </button>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Products</h3>
          <div className="space-y-4">
            {recentProducts.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <img src={p.image} alt={p.name} className="w-12 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {p.category} • ৳{p.price.toLocaleString()}
                  </p>
                </div>
                {p.isNew && <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">New</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Product Categories ({categories.length})
          </h3>
          <button
            onClick={() => window.location.hash = 'admin-categories'}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Manage →
          </button>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No categories yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center border border-purple-200 dark:border-purple-800"
              >
                <p className="font-medium text-purple-900 dark:text-purple-200">
                  {cat.name}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  {products.filter(p => p.category === cat.name).length} products
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Product', icon: Package, page: 'admin-products' },
            { label: 'Manage Products', icon: ShoppingBag, page: 'admin-products' },
            { label: 'New Arrivals', icon: Star, page: 'admin-new-arrivals' },
            { label: 'Popular Items', icon: TrendingUp, page: 'admin-popular' }
          ].map(a => (
            <motion.button
              key={a.label}
              onClick={() => window.location.hash = a.page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <a.icon className="text-purple-600 mb-2" size={24} />
              <span className="text-sm text-center">{a.label}</span>
             
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;