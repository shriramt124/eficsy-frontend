"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Default featured items, used as a fallback
const featured = [
  {
    slug: "/blog/how-we-work",
    title: "How We Work: From Brief to Launch",
    excerpt:
      "Peek behind the curtain of our process, from discovery to delivery, and how we keep momentum without sacrificing quality.",
    image: "/assets/demo/cs2.webp",
    tag: "Process",
  },
  {
    slug: "/blog/design-systems",
    title: "Design Systems That Actually Ship",
    excerpt:
      "A practical guide to building design systems that designers love and engineers adopt.",
    image: "/assets/demo/cs3.webp",
    tag: "Design",
  },
  {
    slug: "/blog/ai-in-product",
    title: "Shipping With AI: Patterns That Work",
    excerpt:
      "Real-world patterns for integrating AI into products without overcomplicating your stack.",
    image: "/assets/demo/cs1.webp",
    tag: "AI",
  },
];

export default function BlogHero({ posts = [], auto = 6500 }) {
  const [i, setI] = useState(0);
  const timer = useRef();

  // Map incoming posts to the format the slider expects.
  // If no posts are provided, use the default 'featured' array.
  const items = posts.length > 0 ? posts.map(p => ({
    slug: `/blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt || 'Read more about this topic.',
    image: p.coverImageUrl || '/assets/demo/cs1.webp',
    tag: p.category?.name || 'General'
  })) : featured;

  console.log("posts from hero ",posts);

  useEffect(() => {
    // Guard against empty items array
    if (items.length === 0) return;
    timer.current = setTimeout(() => setI((s) => (s + 1) % items.length), auto);
    return () => clearTimeout(timer.current);
  }, [i, items.length, auto]);

  const go = (idx) => {
    clearTimeout(timer.current);
    setI(idx);
  };

  // Don't render anything if there are no items to display
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full h-[68vh] md:h-[60vh] lg:h-[56vh] overflow-hidden">
      {/* Slides */}
      {items.map((it, idx) => (
        <div
          key={it.slug + idx}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          <Image src={it.image} alt={it.title} fill className="object-cover" priority={idx === 0} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
        <div className="w-full lg:w-2/3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            <span className="uppercase tracking-wider">Featured</span>
            <span className="opacity-70">•</span>
            <span className="opacity-90">{items[i].tag}</span>
          </div>
          <h1 className="text-white font-extrabold leading-tight text-2xl sm:text-4xl lg:text-5xl mb-4 line-clamp-3">
            {items[i].title}
          </h1>
          <p className="text-white/85 text-sm sm:text-base max-w-2xl mb-6 line-clamp-3">
            {items[i].excerpt}
          </p>
          <a
            href={items[i].slug}
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-[1.02] transition"
          >
            Read article
            <span className="inline-block rotate-45">↗</span>
          </a>
        </div>
      </div>

      {/* Controls */}
      <button
        aria-label="Prev"
        onClick={() => setI((s) => (s - 1 + items.length) % items.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/35 text-white flex items-center justify-center hover:bg-black/55"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        aria-label="Next"
        onClick={() => setI((s) => (s + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/35 text-white flex items-center justify-center hover:bg-black/55"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to ${idx + 1}`}
            onClick={() => go(idx)}
            className={`h-2 rounded-full transition-all ${idx === i ? "bg-white w-7" : "bg-white/40 w-2 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </section>
  );
}
