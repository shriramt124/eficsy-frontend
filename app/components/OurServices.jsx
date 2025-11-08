
"use client";

import React, { useState, useEffect, useRef } from "react";

export default function OurServices() {
  const services = [
    {
      title: "Data Engineering",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      description:
        "Build robust data pipelines and infrastructure that power your business intelligence.",
      fullDescription:
        "We design and implement scalable data architectures, ETL pipelines, and data warehouses. Our data engineering solutions ensure your data is clean, accessible, and ready for analysis at scale.",
    },
    {
      title: "Data Analysis & Analytics",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      description:
        "Transform raw data into actionable insights that drive strategic decisions.",
      fullDescription:
        "Our analytics experts uncover hidden patterns, trends, and opportunities in your data. We deliver comprehensive reports, dashboards, and predictive models that empower data-driven decision making.",
    },
    {
      title: "Design & Development",
      imageUrl:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      description:
        "Craft beautiful, functional digital experiences that users love.",
      fullDescription:
        "From UI/UX design to full-stack development, we create stunning web and mobile applications. Our design-led approach ensures every product is intuitive, accessible, and aligned with your brand vision.",
    },
    {
      title: "AI Strategy & Consulting",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      description:
        "Navigate the AI landscape with expert guidance and strategic roadmaps.",
      fullDescription:
        "We help you identify high-impact AI opportunities, assess readiness, and develop implementation strategies. Our consultants align AI initiatives with your business goals to maximize ROI and competitive advantage.",
    },
    {
      title: "AI Automations",
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      description:
        "Streamline operations with intelligent automation powered by AI.",
      fullDescription:
        "We build custom AI-powered automation solutions that reduce manual work, increase accuracy, and boost productivity. From document processing to customer service bots, we automate what matters most.",
    },
    {
      title: "Data Quality Optimization",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      description:
        "Ensure data accuracy, consistency, and reliability across your organization.",
      fullDescription:
        "We implement data quality frameworks, monitoring systems, and governance policies. Our solutions detect and resolve data issues proactively, ensuring your analytics and AI models are built on trusted data.",
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
      const currentScrollProgress =
        -sectionTop / (sectionHeight - windowHeight);
      setScrollProgress(currentScrollProgress);

      // Determine the active index based on scroll progress
      const newIndex = Math.floor(currentScrollProgress * services.length);
      setActiveIndex(Math.max(0, Math.min(services.length - 1, newIndex)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [services.length]);

  return (
    <section
      ref={sectionRef}
      className="pt-[200px] sm:pt-[300px] lg:pt-16 pb-32 sm:pb-20 bg-white"
      style={{ minHeight: "250vh" }}
    >
      <div className="sticky top-0 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 w-full items-start">
          {/* Left Column: Title and Services List */}
          <div className="flex flex-col">
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                Our Services
              </p>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                Data-Driven Solutions for Modern Business
              </h2>
            </div>
            <div className="space-y-2 sm:space-y-4">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`relative overflow-hidden py-2 sm:py-3 px-2 sm:px-4 rounded-lg transition-all duration-300 ease-in-out ${
                    index < activeIndex
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  <p className="text-xs sm:text-lg md:text-xl font-semibold">
                    {service.title}
                  </p>
                </div>
              ))}
            </div>
            {/* Left-bottom CTA - sits at bottom on large screens */}
            <div className="mt-4 sm:mt-6 py-2 sm:py-3 px-2">
              <div className="bg-white text-black rounded-md max-w-md">
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-5">
                  From data infrastructure to AI automation, we deliver end-to-end solutions that drive business impact.
                </p>
                <a
                  href="/contact"
                  className="relative inline-flex items-center justify-center bg-black text-white font-semibold py-2 px-4 text-xs rounded-full overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 transition-colors duration-500">
                    LEARN MORE <span className="ml-2">↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quote and Image Parallax */}
          <div className="flex flex-col">
            <blockquote className="text-gray-600 max-w-lg text-xs sm:text-sm mb-6 sm:mb-8 lg:mb-10 pt-4 sm:pt-8">
              "We transform complex data challenges into competitive advantages through strategic consulting, robust engineering, and intelligent automation."
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
                        <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                          {service.title}
                        </h3>
                        <p className="text-white text-sm sm:text-base mb-2 sm:mb-4">
                          {service.description}
                        </p>
                        <button className="relative inline-flex items-center justify-center bg-black text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 text-sm sm:text-base rounded-full overflow-hidden group">
                          <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                          <span className="relative z-10">Read More</span>
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
