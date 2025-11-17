import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import NewArrivalsManagement from './pages/admin/NewArrivalsManagement';
import PopularProductsManagement from './pages/admin/PopularProductsManagement';
import AdminLayout from './components/AdminLayout';
import { authAPI, productsAPI } from './services/api';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  // Auto dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Listen to URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      if (hash.startsWith('admin')) {
        setCurrentPage(hash);
      } else {
        switch (hash) {
          case 'products':
          case 'about':
          case 'checkout':
          case 'product-details':
            setCurrentPage(hash);
            break;
          default:
            setCurrentPage('home');
        }
      }
    };

    // Check initial hash on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Fetch products on app load
  useEffect(() => {
    fetchProducts();
    checkAdminAuth();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminAuth = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.data.success && response.data.user.role === 'admin') {
        setAdminUser(response.data.user);
      }
    } catch (error) {
      console.log('Not authenticated as admin');
    } finally {
      setAdminLoading(false);
    }
  };

  // CART FUNCTIONS
  const addToCart = (product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // NAVIGATION HELPERS
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const navigateTo = (page, category = 'All') => {
    setCurrentPage(page);
    if (category) setSelectedCategory(category);
    window.scrollTo(0, 0);
    window.location.hash = page;
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedCategory('All');
    window.location.hash = '';
  };

  const navigateToProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
    window.location.hash = 'product-details';
  };

  const navigateBack = () => {
    setSelectedProduct(null);
    setCurrentPage('products');
    window.location.hash = 'products';
  };

  const navigateToCheckout = () => {
    setCurrentPage('checkout');
    setIsCartOpen(false);
    window.location.hash = 'checkout';
  };

  // ADMIN FUNCTIONS
  const handleAdminLogin = (user) => {
    setAdminUser(user);
    setCurrentPage('admin');
    window.location.hash = 'admin';
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setCurrentPage('home');
    window.location.hash = '';
  };

  const handleDirectOrder = (orderData) => {
    setCartItems([orderData.product]);
    setCurrentPage('checkout');
    window.location.hash = 'checkout';
  };

  // RENDER PAGE
  const renderPage = () => {
    // Admin routes
    if (currentPage.startsWith('admin')) {
      if (adminLoading) {
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        );
      }

      if (!adminUser && currentPage !== 'admin-login') {
        return <AdminLogin onLogin={handleAdminLogin} />;
      }

      if (adminUser && currentPage === 'admin-login') {
        setCurrentPage('admin');
        return null;
      }

      const adminContent = {
        'admin': <AdminDashboard />,
        'admin-products': <ProductManagement />,
        'admin-new-arrivals': <NewArrivalsManagement />,
        'admin-popular': <PopularProductsManagement />,
        'admin-orders': <AdminOrders />,
        'admin-categories': <AdminCategories />,
        'admin-login': <AdminLogin onLogin={handleAdminLogin} />
      }[currentPage] || <AdminDashboard />;

      if (currentPage === 'admin-login') {
        return adminContent;
      }

      return (
        <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
          {adminContent}
        </AdminLayout>
      );
    }

    // Customer routes
    switch (currentPage) {
      case 'product-details':
        return (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={addToCart}
            onNavigateBack={navigateBack}
            onDirectOrder={handleDirectOrder}
          />
        );
      case 'products':
        return (
          <Products
            products={products}
            onAddToCart={addToCart}
            onProductClick={navigateToProductDetails}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            loading={loading}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        );
      case 'about':
        return <About />;
      default:
        return (
          <Home
            onShopNow={() => navigateTo('products')}
            products={products}
            onAddToCart={addToCart}
            onProductClick={navigateToProductDetails}
            onCategoryNavigation={navigateTo}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Only show Navbar & Footer for customer pages */}
      {!currentPage.startsWith('admin') && (
        <Navbar
          cartItems={cartItems}
          toggleCart={toggleCart}
          isDarkMode={isDarkMode}
          currentPage={currentPage}
          navigateTo={navigateTo}
          navigateToHome={navigateToHome}
          adminUser={adminUser}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {/* Only show Footer for customer pages */}
      {!currentPage.startsWith('admin') && (
        <Footer adminUser={adminUser} />
      )}

      {/* Cart for customer pages */}
      {!currentPage.startsWith('admin') && (
        <Cart
          isOpen={isCartOpen}
          onClose={toggleCart}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          navigateToCheckout={navigateToCheckout}
        />
      )}
    </div>
  );
}

export default App;