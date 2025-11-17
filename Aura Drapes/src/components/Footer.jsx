import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, User } from 'lucide-react';

const Footer = ({ adminUser }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Aura Drapes
            </h3>
            <p className="text-gray-300 mb-4">
              Experience the elegance of traditional Bangladeshi sharees with modern sophistication. 
              Each piece tells a story of craftsmanship and heritage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
              <li><a href="#categories" className="text-gray-300 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+880 1XXX-XXXXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@auradrapes.com</span>
              </div>
            </div>


          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Aura Drapes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;