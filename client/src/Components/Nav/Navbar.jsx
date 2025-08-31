import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../../Pages/Auth/LoginModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for modal visibility

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-gradient-to-br from-gray-50 to-pink-50 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-gray-900">
            M<span className="text-sm">ind Care.</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/chatbot" className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 relative group">
            Chatbot
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/experts" className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 relative group">
            Experts
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
          </Link>
          {/* Replace Link with button to open modal */}
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors shadow-md"
          >
            Login
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-4 rounded hover:bg-pink-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/chatbot" 
              className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-4 rounded hover:bg-pink-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Chatbot
            </Link>
            <Link 
              to="/experts" 
              className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-4 rounded hover:bg-pink-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Experts
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-600 hover:text-gray-900 transition-colors py-2 px-4 rounded hover:bg-pink-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {/* Replace Link with button to open modal in mobile menu */}
            <button 
              onClick={() => {
                setIsLoginModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors text-center mt-2"
            >
              Login
            </button>
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;