import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
} from 'lucide-react';

const Home = ({
  onShopNow,
  products,
  onAddToCart,
  onProductClick,
  onCategoryNavigation,
  loading,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  // Real data from MongoDB
  const newArrivals = products.filter((p) => p.isNew);

  // Use real popularOrder field from DB (highest number = most popular)
  const popularProducts = [...products]
    .filter((p) => p.popularOrder && p.popularOrder > 0)
    .sort((a, b) => (b.popularOrder || 0) - (a.popularOrder || 0))
    .slice(0, 8);

  // Slider controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);
  };

  // Horizontal scroll
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Product Card (Beautiful & Optimized)
  const ProductCard = ({ product }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleAddToCart = async (e) => {
      e.stopPropagation();
      setIsAdding(true);
      await onAddToCart(product);
      setTimeout(() => setIsAdding(false), 1000);
    };

    const handleLike = (e) => {
      e.stopPropagation();
      setIsLiked(!isLiked);
    };

    return (
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 flex-none w-80"
        onClick={() => onProductClick(product)}
      >
        <div className="relative overflow-hidden">
          <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-700">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>

          {/* Like Button */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full shadow-lg backdrop-blur-sm ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 hover:bg-white'
              }`}
            >
              <Heart size={20} className={isLiked ? 'fill-current' : ''} />
            </motion.button>
          </div>

          {/* New Badge */}
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              New
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {product.category}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-bold text-purple-600">
              ৳{product.price?.toLocaleString()}
            </span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`p-3 rounded-full transition-all ${
                isAdding
                  ? 'bg-green-600 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
              }`}
            >
              {isAdding ? '✓' : <ShoppingCart size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Embrace Elegance with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aura Drapes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Discover the perfect blend of traditional craftsmanship and contemporary design
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={onShopNow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
          >
            Shop Collection
            <ArrowRight className="ml-3" size={24} />
          </motion.button>
        </div>
      </section>

      {/* NEW ARRIVALS SLIDER */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                New Arrivals
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Fresh from our artisans – exclusively for you
              </p>
            </div>

            <div className="relative">
              {newArrivals.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.6 }}
                  className="relative h-96 md:h-[600px]"
                >
                  {newArrivals.map((product, idx) => (
                    <div
                      key={product._id || product.id}
                      className={`absolute inset-0 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="relative overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-6 left-6 bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-bold shadow-xl">
                            Just Arrived
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900 p-10 flex flex-col justify-center">
                          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            {product.name}
                          </h3>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                            {product.description || "Handcrafted with love using premium silk and traditional weaving techniques"}
                          </p>
                          <div className="flex items-center gap-8 mb-8">
                            <span className="text-4xl font-bold text-purple-600">
                              ৳{product.price?.toLocaleString()}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={28} className="text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={() => onAddToCart(product)}
                              className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-3"
                            >
                              <ShoppingCart size={24} />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => onProductClick(product)}
                              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots */}
              {newArrivals.length > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                  {newArrivals.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`transition-all duration-300 ${
                        i === currentSlide
                          ? 'bg-purple-600 w-12 h-3 rounded-full'
                          : 'bg-gray-400 w-3 h-3 rounded-full'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* POPULAR PRODUCTS */}
      {popularProducts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
                  Popular Now
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Trending among our lovely customers
                </p>
              </div>
              <button
                onClick={onShopNow}
                className="mt-6 md:mt-0 text-purple-600 hover:text-purple-700 font-bold text-lg flex items-center gap-2"
              >
                See All <ArrowRight size={24} />
              </button>
            </div>

            <div className="relative">
              {/* Scroll Buttons */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all hidden lg:block"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-4 rounded-full shadow-2xl hover:scale-110 transition-all hidden lg:block"
              >
                <ChevronRight size={32} />
              </button>

              {/* Products Grid */}
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-8"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {popularProducts.map((product, index) => (
                  <motion.div
                    key={product._id || product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile See More */}
            <div className="text-center mt-10 lg:hidden">
              <button
                onClick={onShopNow}
                className="bg-purple-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-purple-700 transition-all"
              >
                Explore All Products
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;