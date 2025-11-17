import React, { useState, useEffect } from 'react';
import { ShoppingCart, Moon, Sun, Menu, X, Search, User } from 'lucide-react';
import { useCategories } from '../hooks/useCategories.js'; // ← ADD THIS

const Navbar = ({ cartItems, toggleCart, isDarkMode, currentPage, navigateTo, navigateToHome, adminUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const { categories } = useCategories(); // ← REAL CATEGORIES FROM DB

  const handleNavigation = (page) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    navigateTo('products', category);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
        : 'bg-white dark:bg-gray-900'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
              onClick={navigateToHome}
            >
              Aura Drapes
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => handleNavigation('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'home'
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('products')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'products'
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
              >
                Products
              </button>
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                  Categories
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleNavigation('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === 'about'
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
              >
                About
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <Search size={20} />
            </button>



            <button
              onClick={toggleCart}
              className="relative text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => handleNavigation('home')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('products')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                Products
              </button>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleNavigation('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
              >
                About
              </button>


            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;