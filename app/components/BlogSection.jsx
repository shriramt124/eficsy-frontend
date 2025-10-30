"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BlogSection() {
  const posts = [
    {
      id: 1,
      title: "5 UI/UX Design Trends Dominating 2025",
      date: "August 6, 2025",
      tag: "Trending",
      readTime: "10 min read",
      color: "bg-amber-50",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Why Your Startup Needs a Design System Early On",
      date: "August 6, 2025",
      tag: "Trending",
      readTime: "10 min read",
      color: "bg-sky-50",
      image: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200&q=80&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Role of Color Psychology in Branding",
      date: "August 6, 2025",
      tag: "Trending",
      readTime: "10 min read",
      color: "bg-emerald-50",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-black text-white py-15 sm:py-24">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start lg:items-end mb-10">
          <div>
            <p className="text-sm text-gray-100 mb-4">Blog</p>
            <h2 className="text-2xl  sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Insights, Ideas & Design
            
              Inspiration
            </h2>
          </div>

          <div className="lg:pt-10 lg:text-right">
            <p className="text-gray-100/90 max-w-md text-sm sm:text-base">
              Stay up to date with the latest trends, strategies, and perspectives from our design
             
            </p>
          </div>
        </div>

        {/* animated grid: stagger children as they enter the viewport */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {posts.map((p, i) => (
            <motion.article
              key={p.id}
              className={`rounded-md  text-black overflow-hidden group bg-[#071017] flex flex-col h-full  sm:shadow-lg bg-white`}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
              }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-3  sm:p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4 sm:mb-4 text-xs sm:text-sm text-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="uppercase tracking-wide text-[8px] sm:text-xs font-semibold text-gray-800">{p.tag}</span>
                    <span className="text-gray-400 text-[8px] sm:text-xs">{p.readTime}</span>
                  </div>
                  <div className="text-gray-400 text-[8px] sm:text-xs">{p.date}</div>
                </div>

                <h3 className="text-md sm:text-2xl font-extrabold text-black leading-tight mb-2 sm:pb-4">{p.title}</h3>

                <div className="mt-auto">
                  <a href="#" className="text-black text-xs sm:text-sm font-semibold inline-flex items-center gap-2">
                    Read More <span className="text-black/30">↗</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <a href="/blog" className="bg-white text-black px-6 py-3 rounded-full font-semibold inline-flex items-center gap-3">
            See All Blog
          </a>
        </div>
      </div>
    </section>
  );
}
