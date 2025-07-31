import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              🎭 QR Street
            </Link>
          </div>

          {/* Desktop Menü */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/') ? 'text-blue-200 border-b-2 border-blue-200' : ''
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              to="/characters"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/characters') ? 'text-blue-200 border-b-2 border-blue-200' : ''
              }`}
            >
              Karakterler
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-200 transition-colors ${
                isActive('/about') ? 'text-blue-200 border-b-2 border-blue-200' : ''
              }`}
            >
              Hakkında
            </Link>
          </nav>

          {/* Mobile Menü Butonu */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menü */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-600 rounded-lg mt-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/characters"
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Karakterler
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkında
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 