"use client";
import { useEffect, useRef, useState } from "react";
import Metrics from "../components/Metrics";

function WhyChooseUs() {
  const [visible, setVisible] = useState([false, false, false, false]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxAttr = entry.target.getAttribute("data-index");
          const idx = idxAttr ? parseInt(idxAttr, 10) : -1;
          if (idx >= 0 && entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
    <div className="bg-black text-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: sticky-centered heading */}
          <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 self-start">
            <div className="mb-6">
              <span className="inline-flex items-center gap-3 text-sm text-gray-300">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                WHY CHOOSE US
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              The Eficsy Advantage
            </h2>
            <button className="inline-flex items-center gap-3 bg-orange-500 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
              View Details
              <span className="inline-block rotate-45">↗</span>
            </button>
          </div>

          {/* Right: cards. Offset top so initially only the left header is visible */}
          <div className="space-y-6 mt-[35vh] lg:mt-0">
            {cards.map((c, i) => (
              <div
                key={c.title}
                data-index={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`bg-white/5 backdrop-blur-[1px] rounded-3xl p-8 border border-white/10 transition-all duration-700 transform ${
                  visible[i]
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-16"
                }`}
              >
                <div className="text-5xl font-bold mb-6 text-white/70">
                  {(i + 1).toString().padStart(2, "0")}.
                </div>
                <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
                <p className="text-white/80 text-base leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-sm font-semibold text-black/70 mb-6">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white">
            {/* envelope icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
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
          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-colors text-base sm:text-lg"
        >
          Contact Now
          <span className="inline-block translate-x-0 transition-transform group-hover:translate-x-0.5">↗</span>
        </a>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Two-column on large screens: right sidebar stays on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: big headline */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="inline-flex items-center gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                ABOUT US
              </span>
            </div>

            <h1 className="font-extrabold leading-tight  sm:text-7xl tracking-tight text-black">
              Unlock your brand's potential <span className="text-gray-400">with our creative solutions.</span>
            </h1>

            <div className="mt-35 ">
              <a href="#contact" className="inline-flex items-center gap-3 bg-black text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
                BOOK A CALL <span aria-hidden className="ml-1">↗</span>
              </a>
            </div>
          </div>

          {/* Right sidebar: video on top, text anchored bottom */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end lg:justify-end lg:min-h-[500px]">
            <div className="w-full     overflow-hidden ">
              <video
                className="w-full  object-cover"
                poster="/assets/demo/team.jpg"
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            <p className="max-w-md text-gray-700 text-sm sm:text-base lg:text-left">
              Our services help you create digital products and solve your problems objectively, strategy, technology and analysis.
            </p>
          </div>
        </div>
      </div>
      

      {/* Who We Are Section */}
      <div className="max-w-7xl  mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                (WHO WE ARE)
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold leading-tight mb-6">
              <span className="text-orange-500">eficsy</span> we believe that creativity isn’t just about visuals — it’s about creating meaning. We are a multidisciplinary creative agency focused on building brands that leave a lasting impression through intentional strategy.


            </h2>
          </div>
        </div>
      </div>

      {/* Stats Section with Black Background */}
      <div className="bg-black text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
            {/* Left: Company Name */}
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">PIPELY CONSULTING</p>
            </div>

            {/* Right: Logo Row */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">Logoipsum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">Logoipsum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">Logoipsum</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded-full"></div>
                <span className="text-sm font-semibold">Logoipsum</span>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
              With over a decade of experience, we deliver tailored solutions that empower your business to grow.
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="bg-white bg-opacity-5 rounded-2xl p-8">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                COMPLETE CUSTOMER<br />SATISFACTION
              </p>
              <p className="text-5xl sm:text-6xl  text-black font-bold">95%</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white bg-opacity-5 rounded-2xl p-8">
              <p className="text-xs text-gray-600 uppercase tracking-wider mb-4">
                INNOVATION AND<br />VALUABLE INSIGHT
              </p>
              <p className="text-5xl sm:text-6xl text-black font-bold">10+</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white bg-opacity-5 rounded-2xl p-8">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                HIGHLY EFFICIENT<br />FINANCIAL STRATEGIES
              </p>
              <p className="text-5xl sm:text-6xl  text-black font-bold">$10m</p>
            </div>
          </div>
        </div>
      </div>

      {/* More Than Just Designers Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              ( our vision)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
         

            {/* Right: Content */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-4xl sm:text-4xl   font-semibold leading-tight mb-6">
                  More Than Just Designers—We're Your Creative Growth Partner
                </h2>

                <p className="text-gray-600 text-base  mb-8 max-w-xl">
                  With years of experience and a proven track record, we work closely with startups, enterprises, and agencies to deliver meaningful digital solutions. From strategy to pixel-perfect design, we bring visions to life.
                </p>

                <a 
                  href="#work" 
                  className="inline-block text-sm bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
                >
                  View Our Work
                </a>
              </div>

              {/* Mission and Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To help businesses grow through thoughtful, user-centered design that not only looks stunning but performs with purpose.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    To be the go-to creative partner for brands who want to lead with innovation, build trust through design, and create lasting digital impact.
                  </p>
                </div>
              </div>
            </div>
                {/* Left: Image */}
            <div>
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                  alt="Team working together"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

        

      {/* Trusted By Section */}
      <div className="bg-gray-50 pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-40">
            <div className="text-2xl font-bold text-gray-800">tbox</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
              <span className="text-2xl font-bold text-gray-800">Capsule</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
              <span className="text-2xl font-bold text-gray-800">Nietzsche</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 transform rotate-45"></div>
              <span className="text-2xl font-bold text-gray-800">Acme Corp</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 transform skew-y-12"></div>
              <span className="text-2xl font-bold text-gray-800">Luminous</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-800 rounded"></div>
              <span className="text-2xl font-bold text-gray-800">Light</span>
            </div>
          </div>
        </div>
      </div>
 {/* Edge-to-edge Get in Touch strip just below Our Vision */}
        <section className="w-full bg-black text-white">
          <a
            href="/contact"
            className="block max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg sm:text-xl font-semibold tracking-wide">
                GET IN TOUCH
              </span>
              <span aria-hidden className="text-2xl sm:text-3xl">↗</span>
            </div>
          </a>
        </section>
      {/* Our Team Section */}
      <div className="bg-white py-16 sm:py-20">
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
          <div className="space-y-8">
            {/* Team Member 1 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Sara Steiniger</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">Co-founder & Art Director,</span> Vivamus aenean finibus porttitor gravida
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-sm font-semibold underline hover:text-gray-600">INSTAGRAM</a>
                  <a href="#" className="text-sm font-semibold underline hover:text-gray-600">X</a>
                  <a href="#" className="text-sm font-semibold underline hover:text-gray-600">LINKEDIN</a>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">Perfiroa Lopaz</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">Co-founder & Art Director,</span> Vivamus aenean finibus porttitor gravida
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-sm font-semibold underline hover:text-gray-600">INSTAGRAM</a>
                  <a href="#" className="text-sm font-semibold underline hover:text-gray-600">X</a>
                  <a href="#" className="text-sm font-semibold underline hover:text-gray-600">LINKEDIN</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  {/* Why Choose Us Section - black bg, sticky centered heading, cards reveal on scroll */}
  <WhyChooseUs />

  {/* Contact CTA Section */}
  <ContactCTA />
    </main>
  );
}
