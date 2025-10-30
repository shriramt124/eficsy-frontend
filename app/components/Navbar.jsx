"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace(/#/, '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // The height of the sticky navbar
      const navbarHeight = 70; // Approximate height of the header
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'What we do', href: '#services' },
    { name: 'Who we are', href: '#about' },
    { name: 'Insights', href: '#insights' },
    { name: 'Careers', href: '#careers' },
    { name: 'Investors', href: '#investors' },
  ];

  return (
    <header className="bg-white text-black sticky top-0 z-50 shadow-md">
      {/* Main Navigation */}
      <nav className="w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center group">
            <span className="text-blue-800 text-xl sm:text-2xl font-bold">I H V P H</span>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group cursor-pointer"
              >
                <span className="text-xs xl:text-sm font-medium text-gray-700 hover:text-blue-700 transition-all duration-300">
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            ))}
          </div>
          
          {/* CTA and Search - Right Side */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <button className="text-gray-600 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 xl:h-6 xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="px-4 xl:px-6 py-1.5 xl:py-2 rounded-md font-medium text-xs xl:text-sm transition-all duration-300 shadow-lg bg-blue-600 text-white hover:bg-blue-700">
              Contact us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center focus:outline-none group"
          >
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-black ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-black ${
                isMobileMenuOpen ? 'opacity-0' : 'mb-1.5'
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-black ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-4 px-6 space-y-1 bg-white border-t border-gray-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <div className="px-4 pt-3">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-full font-medium text-sm shadow-lg hover:bg-blue-700 transition-all duration-300">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
