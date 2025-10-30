"use client";

import React, { useState, useEffect, useRef } from "react";

export default function OurServices() {
  const services = [
    {
      title: "UI/UX Design",
      imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
      description: "We craft intuitive and beautiful user interfaces that your users will love.",
      fullDescription: "Our UI/UX design process is centered around the user, ensuring that every interaction is seamless and enjoyable. We conduct thorough research and testing to create designs that are not only visually stunning but also highly functional.",
    },
    {
      title: "Brand Identity",
      imageUrl: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1200&q=80",
      description: "We build strong, memorable brands that stand out from the crowd.",
      fullDescription: "We help you define your brand's voice, values, and visual identity. From logo design to brand guidelines, we create a cohesive and compelling brand that resonates with your target audience.",
    },
    {
      title: "Web Design & Development",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      description: "We design and develop high-performance websites that drive results.",
      fullDescription: "Our team of expert designers and developers build fast, responsive, and SEO-friendly websites. We use the latest technologies to create a seamless experience for your users and drive conversions for your business.",
    },
    {
      title: "Design System",
      imageUrl: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=80",
      description: "We create comprehensive design systems for consistency and scale.",
      fullDescription: "We build robust design systems that ensure brand consistency across all your products and platforms. Our design systems are well-documented and easy to use, empowering your team to build better products faster.",
    },
    {
      title: "3D Modelling",
      imageUrl: "slideimage2.jpg",
      description: "We bring your ideas to life with stunning 3D models and visualizations.",
      fullDescription: "Our team of 3D artists creates high-quality models and animations for a variety of applications, including product visualization, architectural rendering, and virtual reality experiences. We use industry-standard software to deliver stunning results.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate the scroll progress within the section
      const currentScrollProgress = -sectionTop / (sectionHeight - windowHeight);
      setScrollProgress(currentScrollProgress);

      // Determine the active index based on scroll progress
      const newIndex = Math.floor(currentScrollProgress * services.length);
      setActiveIndex(Math.max(0, Math.min(services.length - 1, newIndex)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [services.length]);

  return (
    <section ref={sectionRef} className="py-32 sm:py-20 bg-white" style={{ minHeight: "250vh" }}>
      <div className="sticky top-0 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 w-full items-start">
          {/* Left Column: Title and Services List */}
          <div className="flex flex-col">
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Our Services</p>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                What We Do Best
              </h2>
            </div>
            <div className="space-y-2 sm:space-y-4">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`relative overflow-hidden py-2 sm:py-3 px-2 sm:px-4 transition-all duration-300 ease-in-out ${
                    index < activeIndex
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  <p className="text-sm sm:text-lg md:text-xl font-semibold">{service.title}</p>
                </div>
              ))}
            </div>
            {/* Left-bottom CTA - sits at bottom on large screens */}
            <div className="mt-4 sm:mt-6 py-2 sm:py-3 px-2">
              <div className="bg-white text-black rounded-md max-w-md">
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-5">Delivering digital experiences through versatile subscription</p>
                <a href="#" className="inline-block text-black text-sm sm:text-md font-semibold border-b border-black pb-0.5 hover:bg-black hover:text-white">
                  LEARN MORE <span className="ml-2">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quote and Image Parallax */}
          <div className="flex flex-col">
            <blockquote className="text-gray-600 max-w-lg text-xs sm:text-sm mb-6 sm:mb-8 lg:mb-10 pt-4 sm:pt-8">
              "We help brands stand out in the digital space through beautifully crafted user
              experiences and strategic design thinking."
            </blockquote>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] w-full overflow-hidden rounded-md shadow-xl sm:shadow-2xl">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const isPassed = index < activeIndex;

                let transform = "translateY(100%)"; // Start below the viewport
                if (isActive) {
                  transform = "translateY(0)"; // Active card is centered
                } else if (isPassed) {
                  transform = "translateY(-100%)"; // Passed cards move up
                }

                return (
                  <div
                      key={service.imageUrl}
                      className="absolute inset-0 transition-transform duration-500 ease-in-out group"
                      style={{ transform }}
                    >
                      <div className="w-full h-full relative">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        {/* overlay visible by default with black gradient; lifts slightly on hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-0 transition-transform duration-300 ease-in-out z-20 group-hover:-translate-y-3">
                          <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{service.title}</h3>
                          <p className="text-white text-sm sm:text-base mb-2 sm:mb-4">{service.description}</p>
                          <button className="bg-white text-black font-semibold py-1.5 px-3 sm:py-2 sm:px-4 text-sm sm:text-base rounded-full">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
