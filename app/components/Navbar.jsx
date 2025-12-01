"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu helper
  const closeMobile = () => setIsMobileMenuOpen(false);

  // Use proper routes for site pages
  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className={`bg-white text-black sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      {/* Main Navigation */}
      <nav className="w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-28 h-8 sm:w-32 sm:h-10">
              <Image
                src="/eficlogo.png"
                alt="Efic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobile}
                className="relative group cursor-pointer"
              >
                <span className="text-xs xl:text-sm font-medium text-gray-700 hover:text-blue-700 transition-all duration-300">
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </div>

          {/* CTA and Search - Right Side */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">

            <Link href="/contact" onClick={closeMobile} className="relative px-4 xl:px-6 py-1.5 xl:py-2 rounded-full font-medium text-xs xl:text-sm overflow-hidden group transition-all duration-300 shadow-lg bg-black text-white hover:scale-105">
              <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">Contact us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 flex flex-col items-center justify-center focus:outline-none group"
          >
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-black ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
                }`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-black ${isMobileMenuOpen ? 'opacity-0' : 'mb-1.5'
                }`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-black ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="py-4 px-6 space-y-1 bg-white border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMobile}
              className="block px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-gray-100 rounded-lg transition-all duration-300 cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <div className="px-4 pt-3">
            <Link href="/contact" onClick={closeMobile} className="relative w-full inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-full font-medium text-sm shadow-lg overflow-hidden group transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">Contact us</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
