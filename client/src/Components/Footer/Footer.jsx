import React, { useState } from 'react';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-pink-500 to-pink-600 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="text-3xl font-bold text-white mb-8">
            M<span className="text-lg">ind Care.</span>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
            Keep up with the latest news
            <br />
            from Mind Care
          </h2>
          
          {/* Email Subscription */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full sm:flex-1 px-6 py-3 bg-transparent border-2 border-gray-400 rounded-full text-white placeholder-gray-300 focus:outline-none focus:border-white transition-colors"
            />
            <button
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-8 py-3 bg-gray-200 hover:bg-white text-gray-800 font-medium rounded-full transition-colors duration-200"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8 text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Home </a>
          <a href="#" className="hover:text-white transition-colors">About Us</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Investor Relations</a>
          <a href="#" className="hover:text-white transition-colors">Partnership Inquirels</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center space-x-6">
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="#" 
            className="w-10 h-10 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;