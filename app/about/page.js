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
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                ABOUT US
              </span>
            </div>

            <h1 ref={titleRef} className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mb-6 sm:mb-8 md:mb-12">
              {splitText("Unlock your brand's potential with our creative solutions.")}
            </h1>

            <div ref={ctaRef} className="mb-8 sm:mb-10 md:mb-12">
              <a href="#contact" className="relative inline-flex items-center gap-2 sm:gap-3 bg-black text-white font-semibold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full overflow-hidden group transition-all hover:scale-105">
                <span className="absolute inset-0 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">BOOK A CALL</span>
                <span aria-hidden className="relative z-10 ml-1">↗</span>
              </a>
            </div>
          </div>

          {/* Right: Image + Description */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 mt-0 lg:mt-[200px]">
            <div ref={videoRef} className="w-full sm:w-5/6 mx-auto rounded-xl overflow-hidden shadow-lg">
              <img
                className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px]"
                src="slideimage1.jpg"
                alt="About our team"
              />
            </div>

            <p ref={descRef} className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed px-2 sm:px-0">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
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
        <div className="order-2 lg:order-1 overflow-hidden rounded-3xl">
          <div ref={imageRef} className="transform scale-110">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
              alt="Team collaboration"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div ref={contentRef} className="order-1 lg:order-2">
          <div className="reveal-item mb-4">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              (WHO WE ARE)
            </span>
          </div>

          <h2 className="reveal-item text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            <span className="text-orange-500">eficsy</span> we believe that creativity isn't just about visuals — it's about creating meaning.
          </h2>

          <p className="reveal-item text-gray-600 text-lg leading-relaxed">
            We are a multidisciplinary creative agency focused on building brands that leave a lasting impression through intentional strategy.
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
        { ref: stat1Ref, end: 95, suffix: "%" },
        { ref: stat2Ref, end: 10, suffix: "+" },
        { ref: stat3Ref, end: 10, suffix: "m", prefix: "$" }
      ];

      counters.forEach(({ ref, end, suffix = "", prefix = "" }) => {
        if (!ref.current) return; // Add null check
        
        gsap.fromTo(ref.current,
          { innerHTML: 0 },
          {
            innerHTML: end,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function() {
              if (ref.current) { // Add null check in onUpdate
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
            With over a decade of experience, we deliver tailored solutions that empower your business to grow.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="stat-card bg-white/5 backdrop-blur rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              COMPLETE CUSTOMER<br />SATISFACTION
            </p>
            <p ref={stat1Ref} className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              0%
            </p>
          </div>

          {/* Stat 2 */}
          <div className="stat-card bg-white/5 backdrop-blur rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              INNOVATION AND<br />VALUABLE INSIGHT
            </p>
            <p ref={stat2Ref} className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              0+
            </p>
          </div>

          {/* Stat 3 */}
          <div className="stat-card bg-white/5 backdrop-blur rounded-3xl p-8 hover:bg-white/10 transition-all">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">
              HIGHLY EFFICIENT<br />FINANCIAL STRATEGIES
            </p>
            <p ref={stat3Ref} className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              $0m
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
            ( our vision)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <div ref={contentRef} className="flex flex-col justify-between">
            <div>
              <h2 className="reveal-line text-4xl  font-semibold leading-tight mb-6">
                More Than Just Designers—We're Your Creative Growth Partner
              </h2>

              <p className="reveal-line text-gray-600 text-md mb-8 max-w-xl">
                With years of experience and a proven track record, we work closely with startups, enterprises, and agencies to deliver meaningful digital solutions.
              </p>

              <a href="#work" className="reveal-line relative inline-flex items-center justify-center text-sm bg-black text-white font-semibold px-6 py-3 rounded-full overflow-hidden group transition-all hover:scale-105">
                <span className="absolute inset-0 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10">View Our Work</span>
              </a>
            </div>

            {/* Mission and Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
              <div className="reveal-line bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To help businesses grow through thoughtful, user-centered design that performs with purpose.
                </p>
              </div>

              <div className="reveal-line bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To be the go-to creative partner for brands who want to lead with innovation and create lasting impact.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image with parallax */}
          <div className="overflow-hidden rounded-3xl">
            <div ref={imageRef} className="transform">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Team working together"
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
      name: "Sara Steiniger",
      role: "Co-founder & Art Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop"
    },
    {
      id: 2,
      name: "Perfiroa Lopaz",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
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
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                OUR TEAM
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Meet our creative <span className="text-gray-400">collective</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-600 text-base">
              Our service also has a high appeal because it has a beautiful color combination and a minimalist concept.
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
                <div className="flex items-center gap-4">
                  <a href="#" className="text-sm font-semibold underline transition-colors group-hover:text-white duration-700">INSTAGRAM</a>
                  <a href="#" className="text-sm font-semibold underline transition-colors group-hover:text-white duration-700">X</a>
                  <a href="#" className="text-sm font-semibold underline transition-colors group-hover:text-white duration-700">LINKEDIN</a>
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
      title: "Intentional Design",
      desc:
        "We craft brands that are not just beautiful but meaningful — grounded in mission.",
    },
    {
      title: "Strategic Thinking",
      desc:
        "We align design with business objectives so every pixel moves you forward.",
    },
    {
      title: "Creative Precision",
      desc:
        "We obsess over details to deliver work that looks great and performs.",
    },
    {
      title: "Collaborative Process",
      desc:
        "We partner closely with your team to iterate fast and ship with confidence.",
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
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              The Eficsy Advantage
            </h2>
            <button className="relative inline-flex items-center gap-3 bg-orange-500 text-white font-semibold text-sm px-6 py-3 rounded-full overflow-hidden group transition-all hover:scale-105">
              <span className="absolute inset-0 bg-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10">View Details</span>
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
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=200&q=60&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=60&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=200&q=60&auto=format&fit=crop",
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
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white text-white">
            {/* envelope icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-4 h-4">
              <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.7-.75 7.05 5.287a.75.75 0 0 0 .9 0L19.2 6h-15Z" />
            </svg>
          </span>
          CONTACT
        </div>
        <h2 className="relative font-extrabold tracking-tight leading-tight text-4xl sm:text-6xl md:text-7xl lg:text-[72px] mb-10">
          Have any project idea
          <br className="hidden sm:block" /> in your mind?
        </h2>
        <a
          href="/contact"
          className="relative inline-flex items-center gap-2 bg-black text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full overflow-hidden group transition-all hover:scale-105 text-base sm:text-lg"
        >
          <span className="absolute inset-0 bg-orange-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          <span className="relative z-10">Contact Now</span>
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

        
         