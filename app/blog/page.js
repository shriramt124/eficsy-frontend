import Link from 'next/link';
import { ContactCTA } from '../about/page';
import BlogHero from '../components/BlogHero';
import Image from 'next/image';
import { apiUrl } from '../../lib/api';
import { staticBlogs } from '../../lib/staticBlogs';

export const metadata = {
  title: "Blog - Data Engineering & AI Insights | Eficsy",
  description: "Read the latest insights on data engineering, AI automation, web development, and technology trends from Eficsy's expert team.",
  alternates: {
    canonical: '/blog',
  },
};

async function getPosts() {
  try {
    // Ensure this port matches the one your 'next-tiptap' project is running on
    const url = apiUrl('/api/v1/posts?published=true');
    const res = await fetch(url, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    console.log('[BLOG LIST] Fetch:', url, 'status:', res.status);

    if (!res.ok) {
      console.error('Failed to fetch posts:', res.status, await res.text());
      // Return only static blogs if API fails
      const categories = ['All', ...new Set(staticBlogs.map(p => p.category?.name).filter(Boolean))];
      return { posts: staticBlogs, categories };
    }

    const data = await res.json();
    if (!data || typeof data !== 'object') {
      console.error('[BLOG LIST] Invalid JSON shape:', data);
    }

    const apiPosts = data.data?.items || [];
    console.log('[BLOG LIST] API Posts length:', apiPosts.length);

    // Merge static blogs with API posts
    const allPosts = [...staticBlogs, ...apiPosts];

    // Dynamically extract categories from all posts
    const categories = ['All', ...new Set(allPosts.map(p => p.category?.name).filter(Boolean))];

    return { posts: allPosts, categories };
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return static blogs if API fails
    const categories = ['All', ...new Set(staticBlogs.map(p => p.category?.name).filter(Boolean))];
    return { posts: staticBlogs, categories };
  }
}

export default async function BlogPage() {
  const { posts, categories } = await getPosts();

  // Note: Pagination logic would need to be re-implemented,
  // possibly with server-side logic or more complex client-side state.
  // For now, we will display all fetched posts.
  console.log(posts, "from the blog page")

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Blog hero slider */}
      <BlogHero posts={posts.slice(0, 3)} />

      {/* Articles Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-12">
            <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">• Articles</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-2">
              <span className="text-green-700">Read  news & more</span>
            </h2>

          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${cat === 'All'
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
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer"
              >
                {/* Card */}
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden z-10">
                    <Image
                      src={post.coverImageUrl || '/assets/demo/cs1.webp'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 relative z-10 bg-white group-hover:bg-transparent transition-colors duration-300">
                    {/* Metadata */}
                    <div className="flex items-center gap-3 mb-4 text-xs sm:text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                      <span className="flex items-center gap-1">
                        📅 {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      {post.readTime && (
                        <span className="flex items-center gap-1">
                          ⏱️ {post.readTime} min read
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-bold leading-tight text-black group-hover:text-white transition-colors duration-300">
                      {post.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls - Temporarily disabled as we fetch all posts */}
          {/* You can add client-side pagination here if needed */}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
