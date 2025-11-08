"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    background: "/slideimage1.jpg",
    title: "Custom Web Solutions",
    description:
      "We craft bespoke websites and platforms tailored to your unique business needs and goals.",
    buttonText: "Explore Our Services",
    metrics: [
      { value: "45%+", label: "Average Conversion Lift" },
      { value: "2X", label: "Faster Page Loads" },
      { value: "99.9%", label: "Uptime Guarantee" },
    ],
    principles: [
      { icon: "user", title: "User-Centric Design" },
      { icon: "agile", title: "Agile Development" },
      { icon: "scalable", title: "Scalable Architecture" },
    ],
  },
  {
    id: 2,
    background: "/slideimage2.jpg",
    title: "Innovative Mobile Apps",
    description:
      "Engaging and high-performance mobile applications for iOS and Android that captivate your users.",
    buttonText: "Discover Mobile Solutions",
    principles: [
      { icon: "user", title: "Intuitive UX/UI" },
      { icon: "agile", title: "Cross-Platform" },
      { icon: "scalable", title: "Performance Optimized" },
    ],
  },
  {
    id: 3,
    background: "/slideimg3.jpg",
    title: "AI-Powered Insights",
    description:
      "Leverage artificial intelligence to unlock data-driven insights and automate your business processes.",
    buttonText: "Explore AI Services",
    quote: {
      text: "Our architecture is built for scale, ensuring your platform grows seamlessly with your business.",
      author: "Jane Doe",
      role: "Lead Architect",
    },
    principles: [
      { icon: "user", title: "Machine Learning" },
      { icon: "agile", title: "Predictive Analytics" },
      { icon: "scalable", title: "Data Visualization" },
    ],
  },
];

const PrincipleIcon = ({ icon }) => {
  switch (icon) {
    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case "agile":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    case "scalable":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // autoplay timer
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")
        setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
      if (e.key === "ArrowRight")
        setCurrentSlide((s) => (s + 1) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (i) => {
    clearTimeout(timeoutRef.current);
    setCurrentSlide(i);
  };

  const slide = slides[currentSlide];

  return (
    <>
      <section className="relative w-full h-[80vh] md:h-[75vh] lg:h-[70vh] overflow-hidden">
        {/* Slides - use Next/Image for reliable loading */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-800 ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <Image
              src={s.background}
              alt={s.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-3 xs:px-4 sm:px-6 lg:px-12 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-2 xs:mb-3 sm:mb-4 drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mb-3 xs:mb-4 sm:mb-6">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-2 xs:gap-3 sm:gap-4">
                <button className="relative inline-flex items-center px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 text-xs xs:text-sm rounded-full bg-black text-white font-semibold overflow-hidden group transition-all hover:scale-[1.02]">
                  <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 transition-colors duration-500">
                    {slides[currentSlide].buttonText}
                  </span>
                </button>
                <button className="relative inline-flex items-center px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm rounded-full border border-white text-white/90 overflow-hidden group transition">
                  <span className="absolute inset-0 bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                    Learn more
                  </span>
                </button>
              </div>
            </div>

            <aside className="hidden lg:block lg:col-span-1">
              {/* Glassmorphism panel */}
              <div className="relative p-6 rounded-xl overflow-hidden">
                {/* frosted background */}
                <div className="absolute inset-0 bg-white/6 backdrop-blur-lg border border-white/10 shadow-lg rounded-xl" />
                <div className="relative z-10 text-left">
                  {slide.quote ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">
                        Testimonial
                      </h3>
                      <p className="text-gray-100 italic text-sm">
                        “{slide.quote.text}”
                      </p>
                      <p className="mt-4 text-xs text-gray-300">
                        — {slide.quote.author},{" "}
                        <span className="text-gray-300">
                          {slide.quote.role}
                        </span>
                      </p>
                    </div>
                  ) : slide.metrics ? (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">
                        Key Results
                      </h3>
                      <div className="space-y-4">
                        {slide.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="py-3 border-t border-white/10 first:pt-0"
                          >
                            <div className="text-2xl font-extrabold text-white">
                              {m.value}
                            </div>
                            <div className="text-xs text-gray-200 mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-6 text-white">
                        Our Core Principles
                      </h3>
                      <ul>
                        {slide.principles.map((principle, index) => (
                          <li
                            key={index}
                            className="flex items-center mb-4 cursor-pointer group transition-colors duration-200"
                          >
                            <PrincipleIcon icon={principle.icon} />
                            <span className="text-base text-gray-100 group-hover:text-white transition-colors duration-200">
                              {principle.title}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-auto text-gray-300 group-hover:text-white transition-colors duration-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Controls */}
        <button
          aria-label="Prev slide"
          onClick={() =>
            setCurrentSlide((s) => (s - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          aria-label="Next slide"
          onClick={() => setCurrentSlide((s) => (s + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentSlide ? "bg-white w-8 rounded-full" : "bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </section>
      {/* Below-hero showcase section (large left headline + right image) */}
      <section className="bg-white py-8 xs:py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 xs:gap-6 sm:gap-8">
            <div className="lg:col-span-8">
              <h2 className="text-black font-extrabold leading-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                Unlocking growth with data, technology and artificial
                intelligence.
              </h2>
            </div>

            <div className="hidden lg:flex lg:col-span-4 justify-center lg:justify-end">
              <div className="w-full max-w-[420px] rounded-sm overflow-hidden shadow-sm">
                <Image
                  src="/h.jpg"
                  alt="Office"
                  width={420}
                  height={260}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Company intro: image-left, content-right with CTA buttons and trusted-by row */}
      <section className="py-8 xs:py-10 sm:py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xs:gap-6 sm:gap-8 items-center">
            {/* Left image */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-md shadow-sm">
                <Image
                  src="/h2.jpg"
                  alt="Developer working"
                  width={580}
                  height={420}
                  className="object-cover w-full h-auto "
                />
              </div>
            </div>

            {/* Right content */}
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-5 sm:mb-6 max-w-xl">
                From data strategy to managed AI solutions. At efic{" "}
                <span className="w-[50px] h-[50px] bg-green-800 rounded-full"></span>sy we
                align technology advancements with your business model turning
                pressure from AI into performance and data investments into
                impact.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button className="relative inline-flex items-center justify-center px-3 py-2 text-sm sm:text-md bg-black text-white rounded-full font-semibold shadow-sm overflow-hidden group">
                  <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10">Free Discovery Call</span>
                  <span className="ml-2 sm:ml-3 relative z-10 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>

                <button className="relative inline-flex items-center justify-center px-3 py-2 text-sm sm:text-md border border-gray-300 text-gray-800 rounded-full bg-white overflow-hidden group">
                  <span className="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                    Explore Our Services
                  </span>
                  <span className="ml-2 sm:ml-3 relative z-10 inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded group-hover:bg-white/10 transition-colors duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 group-hover:text-white transition-colors duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="pt-4   border-t border-gray-200">
                <div className="text-xs text-gray-400 uppercase mb-4 sm:mb-7">
                  Trusted by
                </div>
                {/* Marquee slider (replaces static faded row) */}
                <div className="overflow-hidden mb-6">
                  <div className="marquee flex items-center gap-8">
                    {/* logos set A */}
                    <div className="flex items-center gap-8">
                      <Image
                        src="/assets/demo/cs1.webp"
                        alt="logo 1"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/demo/cs2.webp"
                        alt="logo 2"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/demo/cs3.webp"
                        alt="logo 3"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/demo/cs1.webp"
                        alt="logo 4"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    {/* logos set B (duplicate) */}
                    <div className="flex items-center gap-8">
                      <Image
                        src="/assets/demo/cs1.webp"
                        alt="logo 1"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/demo/cs2.webp"
                        alt="logo 2"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/demo/cs3.webp"
                        alt="logo 3"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                      <Image
                        src="/assets/demo/cs1.webp"
                        alt="logo 4"
                        width={140}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}