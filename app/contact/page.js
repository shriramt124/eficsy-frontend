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
  <div className="min-h-screen bg-gray-50 py-12 px-4 lg:px-6">
      {/* Hero Section with Form and Image */}
      <div className="mx-auto max-w-7xl">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left Column - Form */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center mb-4">
              <span className="inline-block bg-yellow-50 text-xs text-gray-800 px-3 py-1.5 rounded-md shadow-sm">
                 Get Support
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-extrabold text-4xl md:text-5xl leading-tight text-black mb-3">
              Ready to elevate your brand?
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base mb-6 max-w-lg">
              Have a project in mind or just want to say hello? Reach out - we're here to help you grow, create, and thrive.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full bg-white border-none rounded-xl px-4 py-3 placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
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
                  className="w-full bg-white border-none rounded-xl px-4 py-3 placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message..."
                  rows={5}
                  required
                  className="w-full bg-white border-none rounded-xl px-4 py-3 placeholder-gray-400 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none shadow-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-violet-200 hover:bg-violet-300 text-gray-900 font-semibold rounded-full px-6 py-3 shadow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Now"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-2xl h-[440px] lg:h-[560px] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
                alt="Professional with hard hat"
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
      <div className="mx-auto max-w-7xl mt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Address Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 shadow-sm mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-900">
                <path
                  d="M12 13.5c1.38 0 2.5-1.12 2.5-2.5S13.38 8.5 12 8.5 9.5 9.62 9.5 11s1.12 2.5 2.5 2.5z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Our Address</h3>
            <p className="text-gray-600 text-sm">1234 Elm Street, Suite 567, Springfield</p>
          </div>

          {/* Phone Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 shadow-sm mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-900">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
            <p className="text-gray-600 text-sm">+91 123 456789</p>
          </div>

          {/* Email Card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 shadow-sm mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-900">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
            <p className="text-gray-600 text-sm">Support@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}