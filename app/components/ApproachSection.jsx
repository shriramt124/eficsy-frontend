
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ApproachSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const secondImageRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.fromTo(
      imageRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
    );
    gsap.fromTo(
      secondImageRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  };

  const handleMouseLeave = () => {
    gsap.to(secondImageRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.out' });
  };

  useEffect(() => {
    // Animate heading - slide from right
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, x: 100, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          immediateRender: false,
        },
      }
    );

    // Animate paragraph - slide from right
    gsap.fromTo(
      paraRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: paraRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          immediateRender: false,
        },
      }
    );

    // Animate buttons with stagger - slide from right
    gsap.fromTo(
      buttonRef.current.children,
      { opacity: 0, x: 50, scale: 0.8 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          immediateRender: false,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="bg-black text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left: Image */}
          <div className="order-1 lg:order-1 relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                ref={imageRef}
                src="h3.jpg"
                alt="Data and AI solutions"
                className="w-full h-[280px] sm:h-[350px] md:h-[420px] object-cover"
              />
              <img
                ref={secondImageRef}
                src="h4.jpg"
                alt="AI automation in action"
                className="absolute inset-0 w-full h-full object-cover opacity-0 rounded-2xl"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 lg:order-2">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Our Approach</p>
            <h2 ref={headingRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
              More Than Just Engineers —
              <br />
              We're Your Data & AI Growth Partner
            </h2>
            <p ref={paraRef} className="text-gray-300 max-w-xl mb-6 sm:mb-8 text-sm sm:text-base">
              From data engineering to AI strategy and automation, we work closely with businesses
              to build scalable data pipelines, unlock actionable insights, and deploy intelligent
              solutions that drive measurable impact and sustainable growth.
            </p>

            <div ref={buttonRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#"
                className="relative bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-semibold inline-flex items-center justify-center gap-2 sm:gap-3 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">Explore Our Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4 relative z-10">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <a href="#contact" className="relative text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full inline-flex items-center justify-center gap-2 overflow-hidden group">
                <span className="absolute inset-0 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Schedule a Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
