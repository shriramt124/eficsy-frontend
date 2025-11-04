"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BlogHero from '../components/BlogHero';
import { ContactCTA } from '../about/page';

const posts = [
  {
    slug: 'why-webflow',
    title: 'Why Webflow is Our Go-To Platform for our Modern Websites',
    image: '/assets/demo/cs1.webp',
    category: 'Website',
    date: 'January 12, 2025',
    readTime: '3 min read',
  },
  {
    slug: 'purposeful-branding',
    title: 'The Power of Purposeful Branding of our Strategy in Action',
    image: '/assets/demo/cs2.webp',
    category: 'Design',
    date: 'February 12, 2025',
    readTime: '3 min read',
  },
  {
    slug: 'visual-storytelling',
    title: 'Visual Storytelling: The Secret to of the Emotional Connection',
    image: '/assets/demo/cs3.webp',
    category: 'AI',
    date: 'March 12, 2025',
    readTime: '3 min read',
  },
];

const categories = ['All', 'Design', 'AI', 'Website'];

export default function BlogPage() {
  // Pagination config
  const perPage = 3; // items per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(posts.length / perPage)), [perPage]);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return posts.slice(start, start + perPage);
  }, [currentPage, perPage]);

  // Simple helpers
  const goToPage = (p) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Blog hero slider */}
      <BlogHero />

      {/* Articles Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">• Articles</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-2">
              <span className="text-orange-500">Read new</span>
            </h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black">
              news & more
            </h3>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  cat === 'All'
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {paginatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer"
              >
                {/* Card */}
                <div className="rounded-2xl overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                  {/* Image Container */}
                  <div className="relative w-full h-56 overflow-hidden rounded-2xl">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Metadata */}
                    <div className="flex items-center gap-3 mb-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        📅 {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-bold leading-tight text-black group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                currentPage === 1
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              Prev
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                currentPage === totalPages
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
