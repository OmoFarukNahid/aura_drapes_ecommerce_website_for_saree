import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Aura Drapes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Where tradition meets contemporary elegance. We bring you the finest collection 
            of Bangladeshi sharees, crafted with love and heritage.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Founded with a passion for preserving and promoting the rich textile heritage 
                of Bangladesh, Aura Drapes brings you authentic, handcrafted sharees that 
                tell a story of tradition, craftsmanship, and elegance.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Each piece in our collection is carefully selected from skilled artisans 
                across the country, ensuring that you receive not just a garment, but a 
                piece of cultural heritage.
              </p>
              <div className="flex items-center space-x-2 text-purple-600">
                <Heart size={20} className="fill-current" />
                <span className="font-semibold">Crafted with Love, Worn with Pride</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.prismic.io/milanmagic/86810a8a-e8fe-4d86-9fb5-2a16d08961e1_Banarasi+saree+12.jpg?auto=compress,format&rect=0,0,800,1100&w=740&h=1018&fit=crop"
                alt="Traditional Weaving"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://cfw51.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibXltYW5kYXAuaW4iLCJ2IjozNTA3MDAwMTg5LCJyIjoxLCJpIjoiN2EyYTIwN2MtYmFiMi00OGEzLWNhYjktYjRjNTBhMDhlMjAwIn0/wp-content/uploads/2022/02/Intro-to-Cotton.jpg&fit=crop"
                alt="Sharee Collection"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We'd love to hear from you. Reach out to us through any of these channels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Call Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Available 10AM - 8PM
              </p>
              <a
                href="tel:+8801XXXXXXXXX"
                className="text-purple-600 hover:text-purple-700 font-semibold text-lg"
              >
                +880 1XXX-XXXXXX
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Email Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We'll respond quickly
              </p>
              <a
                href="mailto:info@auradrapes.com"
                className="text-purple-600 hover:text-purple-700 font-semibold text-lg"
              >
                info@auradrapes.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Visit Us
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Showroom location
              </p>
              <p className="text-purple-600 font-semibold">
                Dhaka, Bangladesh
              </p>
            </motion.div>
          </div>

          {/* Business Hours */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="text-purple-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Business Hours
              </h3>
            </div>
            <div className="space-y-2 text-center">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Monday - Friday:</span>
                <span className="font-semibold text-gray-900 dark:text-white">10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Saturday - Sunday:</span>
                <span className="font-semibold text-gray-900 dark:text-white">11:00 AM - 6:00 PM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;