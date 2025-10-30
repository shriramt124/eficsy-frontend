"use client";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const mainPages = ["Home", "About", "Works", "Blog"];
  const innerPages = ["Contact", "Blog Single", "Project Single"];
  const utilityPages = ["Styleguide", "Changelog", "License", "Instructions"];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24">
        {/* Top: Brand + Subscribe */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          <h2 className="text-[48px] leading-[0.9] sm:text-[64px] md:text-[80px] lg:text-[112px] font-extrabold tracking-tight">
            EFICSY 
          </h2>

          <form className="w-full max-w-md lg:max-w-lg">
            <div className="flex items-center rounded-full bg-white/10 ring-1 ring-white/20 overflow-hidden">
              <input
                type="email"
                className="flex-1 bg-transparent px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base placeholder-white/60 text-white focus:outline-none"
                placeholder="Email"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-white text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full m-1 hover:bg-gray-100 transition"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-8 sm:mt-10 lg:mt-12" />

        {/* Bottom grid */}
        <div className="py-10 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* CTA left */}
          <div className="lg:col-span-1">
            <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-md">
              Ready to bring your ideas to life? Share your vision with us or just drop a hello —
              we’re excited to collaborate with you!
            </p>
            <div className="mt-5 sm:mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 sm:gap-3 bg-white text-black px-4 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Let's talk
                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-500" />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <h4 className="text-white/80 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Main Pages</h4>
              <ul className="space-y-2 sm:space-y-3 text-white/70 text-sm">
                {mainPages.map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Inner Pages</h4>
              <ul className="space-y-2 sm:space-y-3 text-white/70 text-sm">
                {innerPages.map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/80 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Utility Pages</h4>
              <ul className="space-y-2 sm:space-y-3 text-white/70 text-sm">
                {utilityPages.map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* tiny bottom bar */}
        <div className="border-t border-white/10 py-4 sm:py-6 text-xs sm:text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {year} EFICSY. All rights reserved.</p>
          <div className="hidden sm:block">Mode in Web.</div>
        </div>
      </div>
    </footer>
  );
}
