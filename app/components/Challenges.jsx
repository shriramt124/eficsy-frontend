"use client";

import { useEffect, useRef, useState } from "react";

export default function Challenges() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const sectionTop = rect.top;

      // The total scrollable distance for the animation is the height of the
      // section minus the height of the viewport.
      const scrollableDistance = sectionHeight - windowHeight;

      if (scrollableDistance <= 0) {
        // Section is not taller than the viewport, so no parallax effect.
        return;
      }
      
      // Calculate progress from 0 to 1 based on how much of the
      // scrollable distance has been covered while the section is pinned.
      // Progress starts when sectionTop is 0 and ends when it's -scrollableDistance.
      const progress = -sectionTop / scrollableDistance;
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Title appears first and stays centered
  const getTitleStyle = () => {
    const titleProgress = Math.min(1, scrollProgress * 2.5);
    const opacity = titleProgress;
    const translateY = (1 - titleProgress) * 40;
    
    return { 
      opacity, 
      transform: `translateY(${translateY}px)`,
    };
  };

  // Strips slide in from left or right with staggered delays
  const getStripStyle = (index, fromLeft = true) => {
    // Stagger the start of each animation.
    const startProgress = index * 0.15;
    const animationDuration = 0.4; // Each strip animates over 40% of the scroll progress.
    
    // Calculate how far into this specific strip's animation we are.
    const rawStripProgress = (scrollProgress - startProgress) / animationDuration;
    const stripProgress = Math.max(0, Math.min(1, rawStripProgress));

    const opacity = stripProgress;
    const translateX = fromLeft 
      ? (1 - stripProgress) * -80
      : (1 - stripProgress) * 80;
    const translateY = (1 - stripProgress) * 20;
    
    return { 
      opacity, 
      transform: `translate(${translateX}px, ${translateY}px)`,
    };
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-white py-16 sm:py-20 md:py-24"
      // Increase section height so the scroll progress can reach 1 on common viewports
      style={{ minHeight: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 w-full">
          <div className="relative min-h-[320px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[600px]">
            {/* Centered headline - stays in center */}
            <h2 
              style={getTitleStyle()}
              className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0b1220] max-w-4xl mx-auto leading-tight z-10 transition-all duration-500 ease-out px-4"
            >
              We don't just write code. we solv your business problems
            </h2>

            {/* Positioned info cards with parallax */}
            <div>
              {/* top-left - slides from LEFT */}
              <div
                style={getStripStyle(0, true)}
                className="absolute z-20 left-2 sm:left-4 lg:left-6 top-2 sm:top-4 w-52 sm:w-64 lg:w-80 bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg transition-all duration-700 ease-out"
              >
                <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-3">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a1.75 1.75 0 001.49 2.6h16.38a1.75 1.75 0 001.49-2.6L13.71 3.86a1.75 1.75 0 00-3.42 0zM12 9v4m0 4h.01" /></svg>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-800">Business-First approach</div>
                </div>
              </div>

              {/* top-right - slides from RIGHT */}
              <div
                style={getStripStyle(1, false)}
                className="absolute z-20 right-2 sm:right-4 lg:right-6 top-10 sm:top-12 lg:top-16 w-56 sm:w-72 lg:w-96 bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg transition-all duration-700 ease-out"
              >
                <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-3">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a1.75 1.75 0 001.49 2.6h16.38a1.75 1.75 0 001.49-2.6L13.71 3.86a1.75 1.75 0 00-3.42 0zM12 9v4m0 4h.01" /></svg>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-800">Fast and Transparent Delivery</div>
                </div>
              </div>

              {/* bottom-left - slides from LEFT */}
              <div
                style={getStripStyle(2, true)}
                className="absolute z-20 left-2 sm:left-6 lg:left-12 bottom-20 sm:bottom-24 lg:bottom-28 w-52 sm:w-64 lg:w-80 bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg transition-all duration-700 ease-out"
              >
                <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-3">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a1.75 1.75 0 001.49 2.6h16.38a1.75 1.75 0 001.49-2.6L13.71 3.86a1.75 1.75 0 00-3.42 0zM12 9v4m0 4h.01" /></svg>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-800">Build to Scale and Secure.</div>
                </div>
              </div>

              {/* bottom-right - slides from RIGHT */}
              <div
                style={getStripStyle(3, false)}
                className="absolute z-20 right-2 sm:right-4 lg:right-6 bottom-2 sm:bottom-4 w-56 sm:w-72 lg:w-96 bg-white border border-gray-100 rounded-xl p-2.5 sm:p-3 lg:p-4 shadow-lg transition-all duration-700 ease-out"
              >
                <div className="flex items-start gap-1.5 sm:gap-2 lg:gap-3">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.29 3.86L1.82 18a1.75 1.75 0 001.49 2.6h16.38a1.75 1.75 0 001.49-2.6L13.71 3.86a1.75 1.75 0 00-3.42 0zM12 9v4m0 4h.01" /></svg>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-800">Enterprice grade architecutre and startup friendly cost.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}