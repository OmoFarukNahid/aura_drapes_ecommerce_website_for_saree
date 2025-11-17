import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Star,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react';
import { authAPI } from '../services/api.js';

const AdminLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: 'admin', icon: LayoutDashboard },
    { name: 'Products', href: 'admin-products', icon: ShoppingBag },
    { name: 'New Arrivals', href: 'admin-new-arrivals', icon: Star },
    { name: 'Popular Products', href: 'admin-popular', icon: TrendingUp },
    { name: 'Settings', href: 'admin-settings', icon: Settings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authAPI.logout();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -280
        }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl lg:static lg:inset-0 lg:translate-x-0 transition-transform duration-300 ease-in-out"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aura Drapes
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = window.location.hash === `#${item.href.replace('/admin/', 'admin-')}`;
            return (
              <button
                key={item.name}
                onClick={() => window.location.hash = item.href.replace('/admin/', 'admin-')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${isActive
                  ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
              <User className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
          >
            <LogOut size={16} />
            <span className="font-medium">
              {loggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10 ">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 ">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Menu size={24} />
            </button>

            {/* Logo + Admin Panel Title → Clickable Home */}
            <div className="flex-1 flex items-center justify-between ">
              <button
                onClick={() => window.location.hash = 'admin'}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"></div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ">
                    Aura Drapes
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-4 cursor-pointer">
                  Admin Panel
                </h1>
              </button>

              {/* View Website Link */}
              <div className="flex items-center">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
                >
                  <span>View Website</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;