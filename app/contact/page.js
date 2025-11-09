
"use client"

import React, { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      const data = await response.json();
      console.log("data from ",data);

      if (response.ok && data.ok) {
        alert("Thanks - your message has been sent!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white py-16 px-4 lg:px-6">
      {/* Hero Section with Form and Image */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column - Form */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center mb-6">
              <span className="inline-block bg-black text-white text-xs font-semibold px-4 py-2 rounded-full">
                Get in Touch
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-black mb-4">
              Ready to elevate your brand?
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              Have a project in mind or just want to say hello? Reach out - we're here to help you grow, create, and thrive.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full bg-white border-2 border-black rounded-lg px-5 py-4 placeholder-gray-500 text-black text-base focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="w-full bg-white border-2 border-black rounded-lg px-5 py-4 placeholder-gray-500 text-black text-base focus:outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={6}
                  required
                  className="w-full bg-white border-2 border-black rounded-lg px-5 py-4 placeholder-gray-500 text-black text-base focus:outline-none focus:ring-2 focus:ring-black resize-none transition-all"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold rounded-lg px-8 py-4 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-2xl h-[440px] lg:h-[600px] rounded-2xl overflow-hidden border-4 border-black shadow-2xl bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
                alt="Professional workspace"
                width={1200}
                height={650}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="mx-auto max-w-7xl mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Address Card */}
          <div className="rounded-2xl bg-white p-8 border-2 border-black hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M12 13.5c1.38 0 2.5-1.12 2.5-2.5S13.38 8.5 12 8.5 9.5 9.62 9.5 11s1.12 2.5 2.5 2.5z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-300 mb-5" />
            <h3 className="text-xl font-bold text-black mb-2">Our Address</h3>
            <p className="text-gray-600 text-base">1234 Elm Street, Suite 567, Springfield</p>
          </div>

          {/* Phone Card */}
          <div className="rounded-2xl bg-white p-8 border-2 border-black hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-300 mb-5" />
            <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
            <p className="text-gray-600 text-base">+91 123 456789</p>
          </div>

          {/* Email Card */}
          <div className="rounded-2xl bg-white p-8 border-2 border-black hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-black mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-300 mb-5" />
            <h3 className="text-xl font-bold text-black mb-2">Email</h3>
            <p className="text-gray-600 text-base">shriramt.124@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
