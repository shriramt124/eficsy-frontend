"use client";
import React from "react";

export default function DataStrategySection() {
  const phases = [
    {
      id: 1,
      title: "Discovery & Research",
      heading: "We start by diving deep into your world. Understanding your vision, audience, and challenges is key to building something truly great.",
      items: [
        "Client Workshops",
        "Audience Analysis",
        "Competitor Benchmarking",
        "Goal Definition",
      ],
      itemsRight: [
        "Technical Feasibility",
        "Success Metrics (KPIs)",
        "Content Audit",
        "User Journey Mapping",
      ],
    },
    {
      id: 2,
      title: "Strategy & Planning",
      heading: "With a clear understanding, we craft a bespoke strategy. This roadmap guides every design and development decision to ensure we're on track.",
      items: [
        "Brand Positioning",
        "Content Architecture",
        "Marketing & SEO Plan",
        "Product Roadmap",
      ],
      itemsRight: [
        "Technology Stack Selection",
        "Feature Prioritization",
        "User Flow Diagrams",
        "Project Timeline",
      ],
    },
    {
      id: 3,
      title: "Design & Prototyping",
      heading: "This is where ideas take shape. We design intuitive, beautiful, and accessible interfaces that your users will love to interact with.",
      items: [
        "Wireframing & Prototyping",
        "UI/UX Design",
        "Brand Identity & Style Guides",
        "Interactive Mockups",
      ],
      itemsRight: [
        "Accessibility (WCAG) Compliance",
        "Design System Creation",
        "User Feedback Sessions",
        "Motion & Micro-interactions",
      ],
    },
    {
      id: 4,
      title: "Development & Engineering",
      heading: "Our developers bring the designs to life with clean, scalable, and high-performance code, building a product that's ready for the future.",
      items: [
        "Agile Development Sprints",
        "Frontend Engineering",
        "Backend & API Development",
        "CMS Integration",
      ],
      itemsRight: [
        "Rigorous Quality Assurance",
        "Performance Optimization",
        "Security Implementation",
        "Cross-browser Testing",
      ],
    },
    {
      id: 5,
      title: "Launch & Growth",
      heading: "Go-live is just the beginning. We ensure a smooth launch and partner with you to analyze, iterate, and grow your product.",
      items: [
        "Deployment & Hosting Setup",
        "Go-to-Market Support",
        "User Onboarding",
        "Analytics & Reporting",
      ],
      itemsRight: [
        "A/B Testing & Optimization",
        "Ongoing Maintenance",
        "User Feedback Analysis",
        "Future Feature Planning",
      ],
    },
  ];

  return (
    <section className="relative bg-white pb-16 pt-8 sm:py-20">
      {/* Intro Header */}
      <div className="bg-white text-black py-10 sm:py-14 md:py-16 px-2 sm:px-6 lg:px-8 mb-4 sm:mb-10 md:mb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left: Large Headline */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">

             <span style={{ fontFamily: "'Brandon Grotesque', sans-serif" }}>Eficsy</span> is an industry leading studio specializing in Data Engineering, AI Strategy, Analytics Solutions, Design & Development.
            </h2>
          </div>

          {/* Right: Description Box */}

        </div>
         <div className="mt-4 sm:mt-0 lg:pt-12 xl:pt-16 flex flex-col items-end justify-center text-right max-w-7xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 justify-end">
              <span className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                how we work
              </span>

            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md ml-auto">
              We craft beautiful user experiences, build robust data pipelines, intelligent AI systems, and scalable digital products for forward-thinking organizations.
            </p>
          </div>

      </div>

      {/* Stacked Cards */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className="sticky top-20 mb-6 sm:mb-8"
            style={{
              transform: `translateY(${index * 20}px)`,
            }}
          >
            <div className="bg-white text-black rounded-2xl p-3 sm:p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
                {/* Left: Title badge / label */}
                <div className="lg:col-span-2 flex items-start justify-between">
                  <span className="inline-block bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {phase.title}
                  </span>
                  <span className="hidden lg:inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-black/70 rounded-full"></span>
                    <span className="w-2 h-2 bg-black/50 rounded-full"></span>
                    <span className="w-2 h-2 bg-black/30 rounded-full"></span>
                  </span>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug mb-6 sm:mb-8">
                    <span className="font-extrabold">{phase.title}</span> {phase.heading.replace(phase.title, "")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-2 sm:gap-y-3">
                    <ul className="space-y-1.5 sm:space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm sm:text-base">
                          <span className="text-black">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {phase.itemsRight.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700 text-sm sm:text-base">
                          <span className="text-black">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}