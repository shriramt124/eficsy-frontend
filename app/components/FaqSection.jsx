"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      q: "What is Webflow and why is it the best website builder?",
      a: "Webflow is a visual development platform that lets you design, build, and launch responsive websites without writing server-side code. It combines a visual designer with clean HTML/CSS and CMS/ecommerce, letting teams ship production-grade sites faster.",
    },
    {
      q: "How can I measure the success of my marketing campaigns?",
      a: "Track a north-star metric plus supporting KPIs (conversions, CAC, LTV, CTR). Use tagged URLs, analytics events, and cohort views to attribute impact and iterate week over week.",
    },
    {
      q: "What is included in your branding services?",
      a: "Brand strategy, naming, messaging, visual identity (logo, color, type), UI kit, and usage guidelines—delivered as reusable assets for product and marketing.",
    },
    {
      q: "Do you offer customized marketing solutions?",
      a: "Yes. We create channel-specific playbooks tailored to your audience and growth stage, including content, paid, lifecycle, and SEO.",
    },
    {
      q: "How quickly can deliver designs for our business?",
      a: "Most engagements ship meaningful work in 2–4 weeks, with weekly milestones and demos.",
    },
    {
      q: "Offer customized marketing solutions?",
      a: "Every plan is modular. Start small and expand to additional channels or funnels as ROI is proven.",
    },
    {
      q: "Why is it the best website builder?",
      a: "Because it blends design freedom with production reliability and performance, while keeping teams in one tool.",
    },
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white text-black py-16 sm:py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start lg:items-end mb-8 sm:mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Frequently Asked
            <br />
              Questions
            </h2>
          </div>
          <div className="lg:text-right">
            <p className="text-sm sm:text-base text-gray-600 max-w-md lg:ml-auto">
              Our services help you create digital products. Stay ahead of the curve with our latest insights, tips, and industry trends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left: image with CTA card */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100 min-h-[320px] sm:min-h-[400px] lg:max-h-[500px]">
            <img
              src="longimage.jpg"
              alt="Support agent"
              className="w-full h-full object-cover"
            />
            {/* CTA card */}
            <div className="absolute bottom-6 left-6 bg-white rounded-md shadow-xl max-w-[360px] p-4 sm:p-6 ">
              <p className="text-xl sm:text-2xl font-semibold mb-2">Need More Info?</p>
              <p className="text-gray-600 text-sm mb-5 text-sm">
                Didn’t find what you were looking for? Let’s chat and solve it together!
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-3 sm:px-5 sm:py-3 py-2 rounded-md bg-black text-white font-semibold shadow hover:brightness-95 transition"
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Right: accordion */}
          <div>
            <ul className="divide-y divide-gray-200">
              {faqs.map((item, idx) => {
                const isOpen = open === idx;
                return (
                  <li key={idx} className="py-6">
                    <button
                      className="w-full flex items-start gap-6 text-left"
                      onClick={() => setOpen(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg  font-semibold flex-1 leading-snug">
                        {item.q}
                      </span>
                      <span className="shrink-0 mt-1 text-gray-600">
                        {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-gray-600">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
