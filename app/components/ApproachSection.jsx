import React from 'react';

export default function ApproachSection() {
  return (
    <section className="bg-black text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left: Image */}
          <div className="order-1 lg:order-1">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="slideimage1.jpg"
                alt="Team collaborating"
                className="w-full h-[280px] sm:h-[350px] md:h-[420px] object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 lg:order-2">
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">About Us</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
              More Than Just Designers —
              <br />
              We're Your Creative Growth Partner
            </h2>
            <p className="text-gray-300 max-w-xl mb-6 sm:mb-8 text-sm sm:text-base">
              With years of experience and a proven track record, we work closely with startups,
              enterprises, and agencies to deliver meaningful digital solutions. From strategy
              to pixel-perfect design and engineering, we bring visions to life and help them
              grow.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#"
                className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-semibold inline-flex items-center justify-center gap-2 sm:gap-3"
              >
                View Our Work
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <a href="#contact" className="text-white border border-white/20 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full inline-flex items-center justify-center gap-2">
                Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
