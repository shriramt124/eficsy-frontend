"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import CtaSection from "../components/CtaSection";
import { ContactCTA } from "../about/page";

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
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">/services</div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <h1 className="lg:col-span-7 text-4xl sm:text-5xl   font-extrabold leading-[1.08]">
            Your partner for strategy, engineering & AI adoption
          </h1>
          <p className="lg:col-span-5 text-base sm:text-lg text-gray-700 lg:pt-4">
            From boardroom ambition to bottom-line results, we deliver AI where it
            drives real value. We align strategy, design, and engineering to build
            systems that scale with your business.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionBlock({
  id,
  label,
  title,
  description,
  bullets,
  ctaText,
  ctaHref = "#",
  image,
  imageLeft = false,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} className="py-14 sm:py-18 lg:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className={`relative w-full h-72 sm:h-80 lg:h-[460px] overflow-hidden rounded-2xl bg-gray-100 ${imageLeft ? "lg:order-1" : ""}`}>
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover transition-transform duration-[1200ms] ${visible ? "scale-100" : "scale-105"}`}
                priority={false}
              />
            )}
          </div>

          {/* Content */}
          <div ref={ref} className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">/{label}</div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              {title}
            </h2>
            <p className={`text-base sm:text-lg text-gray-700 mb-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`} style={{ transitionDelay: "100ms" }}>
              {description}
            </p>

            <div className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">/what we do</div>
            <ul className="space-y-3">
              {bullets.map((b, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: `${160 + idx * 120}ms` }}
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black shrink-0"></span>
                  <span className="text-lg text-black/90 font-medium">{b}</span>
                </li>
              ))}
            </ul>

            <a
              href={ctaHref}
              className={`inline-flex items-center gap-2 mt-8 rounded-xl border border-black/20 px-5 py-3 text-sm font-semibold transition-colors ${
                visible
                  ? "opacity-100 translate-y-0 hover:bg-black hover:text-white"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${160 + bullets.length * 120 + 150}ms` }}
            >
              {ctaText}
              <ArrowUpRightIcon className="w-5 h-5" />
            </a>
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
        id: "strategy",
        label: "ai strategy & consulting",
        title:
          "Turn ambition into action with a clear AI roadmap",
        description:
          "We align AI opportunities with your priorities, define high-ROI use cases, and guide you through adoption with confidence.",
        bullets: [
          "AI Readiness & Quick Scan",
          "AI Governance & Policy",
          "Technology Strategy & Stack Selection",
          "AI Investment & Portfolio Strategy",
          "Adoption & Change Management",
        ],
        ctaText: "How we guide",
        ctaHref: "/contact",
        image: "/assets/demo/cs2.webp",
        imageLeft: false,
      },
      {
        id: "data-quality",
        label: "data quality optimization",
        title:
          "High-performing AI needs trusted data",
        description:
          "We turn messy, fragmented data into a clean, reliable foundation using AI to monitor, enrich, and govern at scale.",
        bullets: [
          "Data Audit & Quality Assessment",
          "Data Enrichment & Unification",
          "Data Reliability Engineering",
          "Data Monetisation Strategy",
        ],
        ctaText: "How we enable",
        ctaHref: "/contact",
        image: "/assets/demo/cs1.webp",
        imageLeft: true,
      },
      {
        id: "training",
        label: "ai training & learning",
        title:
          "Make AI part of your DNA",
        description:
          "We upskill teams, educate leaders, and embed adoption practices so your people and technology grow stronger together.",
        bullets: [
          "Foundations & Awareness Programs",
          "Leadership & Strategy Coaching",
          "Adoption & Enablement Workshops",
          "Learning-as-a-Service Programs",
        ],
        ctaText: "How we train",
        ctaHref: "/contact",
        image: "/assets/demo/cs3.webp",
        imageLeft: false,
      },
      {
        id: "engineering",
        label: "ai engineering & product development",
        title:
          "Build the right AI systems that scale",
        description:
          "We architect, develop, and manage agentic AI systems tailored to your needs so you can focus on outcomes while we handle the complexity.",
        bullets: [
          "Agentic System Design",
          "LLM Integration & Customisation",
          "Copilot & Workflow Development",
          "Model Serving & MLOps",
          "End‑to‑End Managed AI Solutions",
        ],
        ctaText: "How we build",
        ctaHref: "/contact",
        image: "/assets/demo/cs2.webp",
        imageLeft: true,
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <ServicesHero />
      {sections.map((s) => (
        <SectionBlock key={s.id} {...s} />
      ))}
      <ValuesCarousel />
      <ContactCTA  />
    </main>
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

function ValuesCarousel() {
  const values = [
    {
      title: 'Collaboration',
      tagline: 'We achieve more when we work together.',
      description:
        'Collaboration fuels our strength as a team. We value every voice, encourage open dialogue, and create an environment where ideas are shared freely.',
    },
    {
      title: 'Empathy',
      tagline: 'We listen, understand, and put people first.',
      description:
        'By understanding the perspectives and emotions of others, we design solutions and foster relationships that are genuinely human‑centered.',
    },
    {
      title: 'Excellence',
      tagline: 'We aim higher, always striving for quality in all we do.',
      description:
        'We deliver work that is thoughtful, precise, and impactful. Every detail matters — from how we craft ideas to how we execute them.',
    },
    {
      title: 'Integrity',
      tagline: 'We act with honesty and transparency in everything we do.',
      description:
        'Trust, openness, and accountability guide our decisions and relationships with clients, partners, and within our team.',
    },
    {
      title: 'Innovation',
      tagline: 'We push boundaries to turn ideas into outcomes.',
      description:
        'Curiosity and experimentation help us discover new opportunities and build better ways forward.',
    },
  ];

  const secRef = useRef(null);
  const scrollerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setVisible(true), io.disconnect())),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Track index based on scroll position
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const w = scroller.clientWidth;
      const i = Math.round(scroller.scrollLeft / (w * 0.9)); // 0.9 because slides are ~90% width
      setIndex(Math.max(0, Math.min(values.length - 1, i)));
    };
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, [values.length]);

  const goTo = (i) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const slide = scroller.querySelectorAll('[data-slide]')[i];
    if (slide) slide.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
  };

  const prev = () => goTo(Math.max(0, index - 1));
  const next = () => goTo(Math.min(values.length - 1, index + 1));

  return (
    <section ref={secRef} className="py-16 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 sm:mb-12">
          Where imagination
          <br className="hidden sm:block" /> meets execution.
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 lg:gap-8 pb-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {values.map((v, i) => (
              <article
                key={v.title}
                data-slide
                className={`snap-center shrink-0 w-[88%] sm:w-[80%] lg:w-[60%] bg-black text-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-black/30 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="text-gray-400 text-xl sm:text-2xl font-semibold mb-12">{v.title}</div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-6">{v.tagline}</h3>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{v.description}</p>
              </article>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="h-10 w-10 rounded-xl border border-black/20 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            >
              <Chevron dir="left" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="h-10 w-10 rounded-xl border border-black/20 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
            >
              <Chevron dir="right" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
