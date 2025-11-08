"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    services: []
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCheckbox = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // fake submit for now
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-white text-black py-10 sm:py-12 md:py-16 lg:py-20 relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 md:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight">
              <span className=" text-black  bg-clip-text  ">
                Let's build
              </span>
              <br />
              <span className="text-black">something amazing</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-900 max-w-lg">
              Ready to transform your ideas into reality? Tell us about your project and we'll help you ship fast, beautifully, and with impact.
            </p>
            <div className="pt-2 sm:pt-4">
              <p className="text-gray-400 mb-1 sm:mb-2 text-xs sm:text-sm">Mail us at</p>
              <a href="mailto:info@eficsy.com" className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black hover:text-green-700 transition-colors">
                info@eficsy.com
              </a>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white text-black backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/6"
          >
            <h3 className="text-lg font-semibold text-black mb-4">Get in touch</h3>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-gray-800 text-xs mb-1 sm:mb-1.5">Your name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-black/8 rounded-lg px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-black placeholder-gray/500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-black text-xs mb-1 sm:mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-black/8 rounded-lg px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-xs mb-1 sm:mb-1.5">Project description</label>
                <textarea
                  placeholder="Briefly describe your project..."
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  rows="4"
                  className="w-full border border-black/8 rounded-lg px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 text-xs mb-1.5 sm:mb-2">Services needed</label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {[
                    'Website',
                    'Mobile App',
                    'E-Commerce',
                    'Brand Identity',
                    'AI Solutions',
                    'Automation',
                    'Web App',
                    'Other'
                  ].map((service) => (
                    <label key={service} className="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleCheckbox(service)}
                        className="w-4 h-4 rounded border-white/20 bg-black/20 text-black focus:ring-orange-300"
                      />
                      <span className="text-black text-xs">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="relative w-full bg-black text-white font-semibold py-3 rounded-full overflow-hidden group transition-all shadow-xl"
                >
                  <span className="absolute inset-0 bg-green-700 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10">{submitted ? 'Sent — Thanks!' : 'Send Message'}</span>
                </motion.button>
              </div>
            </form>
            {submitted && (
              <div className="mt-4 p-3 rounded-md bg-green-800/40 text-green-200 text-sm">
                Thanks — we received your message and will reply shortly.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
