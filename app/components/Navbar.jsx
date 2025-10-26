"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navbarHeight = 64; // 4rem = 64px
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 mt-[1rem] mx-auto w-full z-50 transition-all duration-500`}
    >
      <div className="flex items-center justify-center h-16 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Centered Navigation Container */}
        <div className={`flex items-center justify-between w-full max-w-4xl mx-auto rounded-full px-6 py-2 border transition-all duration-500 ${
          isScrolled 
            ? 'bg-black border-white/20 text-white' 
            : 'bg-white/70 border-white/10 text-black'
        }`}>
          {/* Logo - Left Side */}
          <Link href="/" className="flex items-center group relative z-10">
            <Image 
              src="/logo.jpg" 
              alt="Eficsy Logo" 
              width={120} 
              height={40}
              className="h-8 sm:h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={`text-sm font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-white/90 hover:text-white' 
                    : 'text-black/90 hover:text-black'
                }`}>
                  {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            ))}
          </div>
          
          {/* CTA Button - Right Side */}
          <div className="hidden lg:flex">
            <button className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-lg ${
              isScrolled 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}>
              Let's Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center focus:outline-none group"
          >
            <span
              className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-white' : 'bg-black'
              } ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-white' : 'bg-black'
              } ${
                isMobileMenuOpen ? 'opacity-0' : 'mb-1.5'
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? 'bg-white' : 'bg-black'
              } ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-4 px-6 space-y-1 bg-gradient-to-br from-gray-900/98 via-purple-900/95 to-purple-800/95 backdrop-blur-2xl mx-4 mb-4 rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <div className="px-4 pt-3">
            <button className="w-full px-6 py-3 bg-black text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300">
              Let's Connect
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
