
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Metrics from "../components/Metrics";

gsap.registerPlugin(ScrollTrigger);

// Hero Section with GSAP Animations
function AboutHero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const tagRef = useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial reveal timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate tag with slide
      tl.fromTo(tagRef.current, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.8 }
      );

      // Clip-path text reveal for title - each word reveals from bottom
      const words = titleRef.current.querySelectorAll(".word");
      tl.fromTo(words,
        { 
          opacity: 0, 
          y: 100, 
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)"
        },
        { 
          opacity: 1, 
          y: 0, 
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: 1.2, 
          stagger: 0.08,
          ease: "power4.out"
        },
        "-=0.3"
      );

      // Description text with mask reveal
      tl.fromTo(descRef.current,
        { 
          opacity: 0, 
          y: 30,
          clipPath: "inset(0 0 100% 0)"
        },
        { 
          opacity: 1, 
          y: 0, 
          clipPath: "inset(0 0 0% 0)",
          duration: 1
        },
        "-=0.6"
      );

      // CTA button with bounce
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0,
          scale: 1, 
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );

      // Video stays fixed (no parallax), just initial reveal
      gsap.fromTo(videoRef.current,
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3
        }
      );

      // Parallax on scroll for title only
      gsap.to(titleRef.current, {
        y: -40,
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
      <span key={i} className="word inline-block" style={{ perspective: "1000px" }}>
        {word}{i < text.split(" ").length - 1 && "\u00A0"}
      </span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-white via-gray-50 to-white pt-12 pb-12 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-20 overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <div className="lg:col-span-8">
            <div ref={tagRef} className="mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
                 <span> About efic <span className="w-2 h-2 rounded-full bg-green-800 inline-block" /> sy </span>  
              </span>
            </div>

            <h1 ref={titleRef} className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mb-6 sm:mb-8 md:mb-12 lg:mt-12">
              {splitText("Transforming Data into Your Greatest Competitive Advantage")}
            </h1>

            <div ref={ctaRef} className="mb-8 sm:mb-10 md:mb-12 sm:mt-[100px]">
              <a href="/contact" className="relative inline-flex items-center gap-2 sm:gap-3 bg-black text-white font-semibold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full overflow-hidden group transition-all hover:scale-105">
                <span className="absolute inset-0 bg-green-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">START YOUR PROJECT</span>
                <span aria-hidden className="relative z-10 ml-1">↗</span>
              </a>
            </div>
          </div>

          {/* Right: Image + Description */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-4 mt-0 lg:mt-[150px]">
            <div ref={videoRef} className=" w-full rounded-md mx-auto  overflow-hidden">
              <img
                className="object-cover"
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                alt="Data analytics and AI solutions"
              />
            </div>

            <p ref={descRef} className="text-gray-700 text-xs sm:text-sm  leading-relaxed px-2 sm:px-0">
              We're a data-driven technology consultancy specializing in engineering robust data pipelines, delivering actionable analytics, building intelligent AI automations, and crafting beautiful digital experiences that scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Who We Are with Parallax Image
function WhoWeAre() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Content reveal
      gsap.fromTo(contentRef.current.querySelectorAll(".reveal-item"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image with parallax */}
        <div className="order-2 lg:order-1 overflow-hidden rounded-xl">
          <div ref={imageRef} className="transform scale-110">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              alt="Data engineering and analytics team"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div ref={contentRef} className="order-1 lg:order-2">
          <div className="reveal-item">
            <span className="text-xs  font-medium text-gray-600 uppercase tracking-wide">
              (WHO WE ARE)
            </span>
          </div>

          <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            At <span className="text-black-500">eficsy</span>, we don't just build what you ask for—we help you discover what you truly need.
          </h2>

          <p className="reveal-item text-gray-600 text-md leading-relaxed">
            We're a team of data engineers, AI strategists, analysts, and full-stack developers passionate about transforming complex data challenges into measurable business outcomes. From robust data infrastructure to intelligent automation and stunning digital products, we deliver end-to-end solutions that scale.
          </p>
        </div>
      </div>
    </section>
  );
}

// Stats Section with Counter Animation
function StatsSection() {
  const sectionRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animations
      const counters = [
        { ref: stat1Ref, end: 50, suffix: "+" },
        { ref: stat2Ref, end: 100, suffix: "%" },
        { ref: stat3Ref, end: 24, suffix: "/7" }
      ];

      counters.forEach(({ ref, end, suffix = "", prefix = "" }) => {
        if (!ref.current) return;
        
        gsap.fromTo(ref.current,
          { innerHTML: 0 },
          {
            innerHTML: end,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function() {
              if (ref.current) {
                ref.current.innerHTML = prefix + Math.ceil(this.targets()[0].innerHTML) + suffix;
              }
            },
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      });

      // Card reveals with stagger
      gsap.fromTo(".stat-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Heading */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
            Proven expertise in data engineering, AI automation, analytics, and modern web & mobile development.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="stat-card bg-white/5 backdrop-blur rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              SUCCESSFUL PROJECTS<br />DELIVERED
            </p>
            <p ref={stat1Ref} className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              20+
            </p>
          </div>

          {/* Stat 2 */}
          <div className="stat-card bg-white/5 backdrop-blur rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              CLIENT SATISFACTION<br />RATE
            </p>
            <p ref={stat2Ref} className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              98%
            </p>
          </div>

          {/* Stat 3 */}
          <div className="stat-card bg-white/5 backdrop-blur rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              DEDICATED EXPERT<br />SUPPORT
            </p>
            <p ref={stat3Ref} className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Vision Section with Stacked Scroll Effect
function VisionSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale and parallax on scroll
      gsap.to(imageRef.current, {
        scale: 1.2,
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Text reveals
      gsap.fromTo(contentRef.current.querySelectorAll(".reveal-line"),
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            (OUR VISION)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <div ref={contentRef} className="flex flex-col justify-between">
            <div>
              <h2 className="reveal-line text-4xl font-semibold leading-tight mb-6">
                Your Strategic Partner for Data-Driven Innovation and Digital Excellence
              </h2>

              <p className="reveal-line text-gray-600 text-sm mb-8 max-w-xl">
                We combine cutting-edge data engineering, AI strategy, advanced analytics, and exceptional design & development to help businesses unlock new opportunities, optimize operations, and build products that users love.
              </p>

              <a href="/services" className="reveal-line relative inline-flex items-center justify-center text-xs bg-black text-white font-semibold px-4 py-2 rounded-full overflow-hidden group transition-all hover:scale-105">
                <span className="absolute inset-0 bg-green-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">Explore Our Services</span>
              </a>
            </div>

            {/* Mission and Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              <div className="reveal-line bg-white rounded-xl p-4 shadow-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To empower businesses through intelligent data solutions, AI automation, and beautifully crafted digital products that drive measurable impact and sustainable growth.
                </p>
              </div>

              <div className="reveal-line bg-white rounded-xl p-4 shadow-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To be the trusted technology partner for forward-thinking companies looking to lead with data, automate intelligently, and create digital experiences that matter.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image with parallax */}
          <div className="overflow-hidden rounded-2xl">
            <div ref={imageRef} className="transform">
              <img
                src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
                alt="Modern technology and innovation"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Team Section with Reveal Animation
function TeamSection() {
  const sectionRef = useRef(null);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Team member reveals
      gsap.fromTo(".team-member",
        { opacity: 0, y: 50, scaleY: 0.8 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Our Data Engineers",
      role: "Building Scalable Data Infrastructure",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Our AI Strategists",
      role: "Driving Intelligent Automation",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Our Developers",
      role: "Crafting Exceptional Digital Experiences",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-green-800 inline-block" />
                OUR EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Meet the experts behind <span className="text-gray-400">your success</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600 text-base">
              A multidisciplinary team of data engineers, AI specialists, analysts, and creative developers dedicated to delivering excellence.
            </p>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-8 relative">
          {/* Floating Image on Hover */}
          {hoveredMember && (
            <div 
              className="hidden lg:block fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
              style={{
                animation: 'fadeIn 0.3s ease-out'
              }}
            >
              <div className="relative">
                <img
                  src={hoveredMember.image}
                  alt={hoveredMember.name}
                  className="w-64 h-80 object-cover rounded-2xl shadow-2xl transform rotate-6"
                />
              </div>
            </div>
          )}

          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="team-member border-t border-gray-200 pt-8 pb-8 px-8 cursor-pointer transition-all hover:border-black relative overflow-hidden group"
              onMouseEnter={() => setHoveredMember(member)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out -z-10"></div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 transition-colors group-hover:text-white duration-700">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 transition-colors group-hover:text-gray-300 duration-700">
                    <span className="font-semibold">{member.role}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  // Framer Motion staggered "stack" animation
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 28, rotate: 2, scale: 0.98, filter: "blur(2px)" },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    hover: { y: -2, rotate: -0.2, transition: { duration: 0.2 } },
  };

  const cards = [
    {
      title: "End-to-End Solutions",
      desc:
        "From data pipelines to AI automation to beautiful apps—we handle the complete technology stack so you don't have to juggle multiple vendors.",
    },
    {
      title: "Data-Driven Strategy",
      desc:
        "We don't just build—we analyze, strategize, and align every solution with your business objectives for maximum ROI.",
    },
    {
      title: "Cutting-Edge Technology",
      desc:
        "We leverage the latest in cloud infrastructure, AI/ML frameworks, and modern development practices to keep you ahead of the curve.",
    },
    {
      title: "Scalable & Secure",
      desc:
        "Every solution we deliver is built to scale with your growth and secured with industry best practices and compliance standards.",
    },
  ];

  return (
    <div className="bg-black text-white py-20 sm:py-28 mt-10 sm:mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: sticky-centered heading */}
          <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 self-start">
            <div className="mb-6 mt-20">
              <span className="inline-flex items-center gap-3 text-sm text-gray-300">
                <span className="w-2 h-2 rounded-full bg-green-800 inline-block" />
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              The <span style={{ fontFamily: "'Brandon Grotesque', sans-serif" }}>Eficsy</span> Advantage
            </h2>
            <button className="relative inline-flex items-center gap-3 bg-green-800 text-white font-semibold text-sm px-6 py-3 rounded-full overflow-hidden group transition-all hover:scale-105">
              <span className="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">View Our Work</span>
              <span className="relative z-10 inline-block rotate-45">↗</span>
            </button>
          </div>

          {/* Right: stacked stagger cards */}
          <motion.div
            className="space-y-6 mt-[25vh] lg:mt-0"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                variants={item}
                whileHover="hover"
                className="relative why-card"
              >
                <div className="text-5xl font-bold mb-6 text-white/70">
                  {(i + 1).toString().padStart(2, "0")}.
                </div>
                <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ContactCTA() {
  const containerRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const images = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=60&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=200&q=60&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&q=60&auto=format&fit=crop",
  ];

  const lastTs = useRef(0);
  const handleMove = (e) => {
    const now = performance.now();
    if (now - lastTs.current < 35) return;
    lastTs.current = now;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const img = images[Math.floor(Math.random() * images.length)];
    const id = now + Math.random();
    const rot = Math.floor(Math.random() * 40) - 20;

    setTrail((prev) => {
      const next = [...prev, { id, x, y, img, rot }];
      return next.slice(-30);
    });

    setTimeout(() => {
      setTrail((prev) => prev.filter((p) => p.id !== id));
    }, 900);
  };

  return (
    <section
      id="contact"
      className="relative bg-white py-24 sm:py-28 overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={(e) => {
        const t = e.touches?.[0];
        if (t) handleMove({ clientX: t.clientX, clientY: t.clientY });
      }}
    >
      {/* Image trail layer */}
      <div className="pointer-events-none absolute inset-0">
        {trail.map((t) => (
          <img
            key={t.id}
            src={t.img}
            alt="trail"
            className="absolute w-32 h-32 sm:w-[150px] sm:h-[150px] object-cover rounded-2xl shadow-lg trail-burst"
            style={{
              left: t.x,
              top: t.y,
              transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
            }}
            draggable={false}
          />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-sm font-semibold text-white mb-6">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-800 text-white">
            {/* envelope icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.7-.75 7.05 5.287a.75.75 0 0 0 .9 0L19.2 6h-15Z" />
            </svg>
          </span>
          LET'S TALK
        </div>
        <h2 className="relative font-extrabold tracking-tight leading-tight text-4xl sm:text-6xl md:text-7xl lg:text-[72px] mb-10">
          Ready to transform your
          <br className="hidden sm:block" /> data into results?
        </h2>
        <a
          href="/contact"
          className="relative inline-flex items-center gap-2 bg-black text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full overflow-hidden group transition-all hover:scale-105 text-base sm:text-lg"
        >
          <span className="absolute inset-0 bg-green-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          <span className="relative z-10">Start Your Project</span>
          <span className="relative z-10 inline-block transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <AboutHero />
      <WhoWeAre />
      <StatsSection />
      <VisionSection />
      <TeamSection />
      <WhyChooseUs />
      <ContactCTA />
    </main>
  );
}
