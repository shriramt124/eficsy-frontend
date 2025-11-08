"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaSection from "../components/CtaSection";
import { ContactCTA } from "../about/page";
import HorizontalScrollCarousel from "../components/HorizontalScrollCarousel";

gsap.registerPlugin(ScrollTrigger);

function ArrowUpRightIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServicesHero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline for page load
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate tag
      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      // Split title words and animate
      const titleWords = titleRef.current.querySelectorAll(".word");
      tl.fromTo(
        titleWords,
        { opacity: 0, y: 50, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          duration: 0.8, 
          stagger: 0.1 
        },
        "-=0.3"
      );

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );

      // Parallax scroll effect
      gsap.to(titleRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(subtitleRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text) => {
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="word inline-block"
        style={{ perspective: "1000px" }}
      >
        {word}
        {i < text.split(" ").length - 1 && "\u00A0"}
      </span>
    ));
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white text-black overflow-hidden"
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
        <div 
          ref={tagRef}
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-500 mb-4 sm:mb-6 inline-flex items-center gap-2"
        >
          <span className="h-px w-6 sm:w-8 bg-gray-400" />
          services
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          <h1 
            ref={titleRef}
            className="lg:col-span-7 text-3xl sm:text-4xl md:text-5xl   font-extrabold leading-[1.05] tracking-tight"
          >
            {splitText("Transform your business with data-driven solutions and intelligent automation")}
          </h1>
          
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <p 
              ref={subtitleRef}
              className="text-xs sm:text-lg md:text-md text-gray-700 leading-relaxed"
            >
              We specialize in data engineering, advanced analytics, cutting-edge design, 
              AI strategy, and intelligent automation to help your business innovate, 
              scale, and succeed in the digital age.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-xl font-semibold text-sm   hover:bg-gray-800 transition-all hover:scale-105"
              >
                Get Started
                <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-black text-black rounded-xl font-semibold text-sm   hover:bg-black hover:text-white transition-all"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
 

export default function ServicesPage() {
  const sections = useMemo(
    () => [
      {
        id: "data-engineering",
        label: "data engineering",
        title:
          "Build robust data pipelines that power your business",
        description:
          "We design and implement scalable data infrastructure that transforms raw data into actionable insights, ensuring your systems are reliable and efficient.",
        bullets: [
          "Data Pipeline Architecture & Development",
          "ETL/ELT Process Design",
          "Data Warehouse & Lake Implementation",
          "Real-time Data Processing",
          "Data Quality & Validation",
          "Cloud Data Infrastructure",
        ],
        ctaText: "Learn more",
        ctaHref: "/contact",
        image: "/services/data-engineering.jpg",
        imageLeft: false,
      },
      {
        id: "data-analytics",
        label: "data analysis and analytics",
        title:
          "Transform data into strategic business insights",
        description:
          "We analyze your data to uncover patterns, trends, and opportunities that drive informed decision-making and measurable business outcomes.",
        bullets: [
          "Business Intelligence & Reporting",
          "Advanced Analytics & Modeling",
          "Predictive Analytics",
          "Data Visualization & Dashboards",
          "Statistical Analysis",
          "Performance Metrics & KPI Tracking",
        ],
        ctaText: "Explore analytics",
        ctaHref: "/contact",
        image: "/services/data-analytics.jpg",
        imageLeft: true,
      },
      {
        id: "design-development",
        label: "design and development",
        title:
          "Web & Android apps designed and built to perfection",
        description:
          "We create stunning, user-friendly websites and Android applications that deliver exceptional experiences. From concept to launch, we handle design, development, and deployment.",
        bullets: [
          "Web Design & Development (React, Next.js, Vue)",
          "Android App Development (Native & Cross-platform)",
          "UI/UX Design & Interactive Prototyping",
          "Responsive & Mobile-First Design",
          "E-commerce & Custom Web Solutions",
          "App Store Deployment & Maintenance",
        ],
        ctaText: "See our work",
        ctaHref: "/contact",
        image: "/services/design-development.jpg",
        imageLeft: false,
      },
      {
        id: "ai-strategy",
        label: "ai strategy & consulting",
        title:
          "Chart your path to successful AI adoption",
        description:
          "We help you identify opportunities, develop roadmaps, and implement AI solutions that align with your business objectives and deliver real ROI.",
        bullets: [
          "AI Readiness Assessment",
          "AI Use Case Identification",
          "Technology Strategy & Roadmap",
          "AI Governance & Policy",
          "Change Management & Adoption",
          "AI Investment Planning",
        ],
        ctaText: "Get started",
        ctaHref: "/contact",
        image: "/services/ai-strategy.jpg",
        imageLeft: true,
      },
      {
        id: "ai-automations",
        label: "ai automations",
        title:
          "Automate workflows and boost productivity with AI",
        description:
          "We design and deploy intelligent automation solutions that streamline operations, reduce manual effort, and accelerate your business processes.",
        bullets: [
          "Process Automation & Optimization",
          "Intelligent Document Processing",
          "AI-Powered Chatbots & Assistants",
          "Workflow Automation",
          "RPA & AI Integration",
          "Custom AI Solutions",
        ],
        ctaText: "Automate now",
        ctaHref: "/contact",
        image: "/services/ai-automation.jpg",
        imageLeft: false,
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <ServicesHero />
      <StackedServices sections={sections} />
      <HorizontalScrollCarousel />
      <ContactCTA  />
    </main>
  );
}

function StackedServices({ sections }) {
  // Scroll-driven stacked overlap: each card is sticky and the next overlaps it.
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const count = sections.length;

  return (
    <section ref={containerRef} className="relative bg-white text-black">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
        <div className="py-6 sm:py-8">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-500">/services</div>
          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">What we do</h2>
        </div>
      </div>

      {/* Give enough scroll space for stacking: N cards -> N * 100vh */}
      <div style={{ height: `${count * 100}vh` }} className="relative">
        {sections.map((s, i) => (
          <ServiceStackCard
            key={s.id}
            index={i}
            count={count}
            progress={scrollYProgress}
            {...s}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceStackCard({ index, count, progress, id, label, title, description, bullets, ctaText, ctaHref = '#', image, imageLeft }) {
  // Compute this card's animation window within the overall scroll range
  const start = index / count;
  const end = (index + 1) / count;

  const local = useTransform(progress, [start, end], [0, 1], { clamp: true });

  // Subtle scale down and lift as next cards come in
  const scale = useTransform(local, [0, 1], [1, 0.94]);
  const y = useTransform(local, [0, 1], [0, -24]);
  const shadowOpacity = useTransform(local, [0, 1], [0.18, 0.28]);
  const filter = useMotionTemplate`drop-shadow(0 0 0 rgba(0,0,0,${shadowOpacity}))`;

  // Slight image parallax in the card
  const imgY = useTransform(local, [0, 1], ["-6%", "6%"]);

  return (
    <motion.article
      id={id}
      style={{ zIndex: 10 + index, scale, y }}
      className="sticky top-12 sm:top-16 md:top-20 will-change-transform"
    >
      <motion.div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-12" style={{ filter }}>
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-16 items-center p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Image column */}
            <div className={`${imageLeft ? 'lg:order-1' : ''}`}>
              {image && (
                <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-[420px] overflow-hidden rounded-lg sm:rounded-xl bg-gray-100">
                  <motion.div style={{ y: imgY }} className="absolute inset-0">
                    <Image src={image} alt={title} fill className="object-cover" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Content column */}
            <div className="max-w-xl">
              <div className="inline-block bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold">{label}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl   font-extrabold leading-tight mb-2 sm:mb-3">{title}</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-3">{description}</p>

              {!!(bullets && bullets.length) && (
                <ul className="space-y-2 sm:space-y-2 mb-5 sm:mb-6">
                  {bullets.slice(0, 6).map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 sm:gap-3">
                      <span className="mt-1.5 sm:mt-2 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-black shrink-0" />
                      <span className="text-black/90 text-xs sm:text-sm md:text-base">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-lg sm:rounded-xl border border-black/20 px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition-colors"
              >
                {ctaText}
                <ArrowUpRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

function Chevron({ dir = 'right', className = 'w-5 h-5' }) {
  const d =
    dir === 'left'
      ? 'M15 6l-6 6 6 6'
      : dir === 'right'
      ? 'M9 6l6 6-6 6'
      : dir === 'up'
      ? 'M6 15l6-6 6 6'
      : 'M6 9l6 6 6-6';
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
