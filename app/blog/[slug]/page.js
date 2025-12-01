import Image from 'next/image';
import { notFound } from 'next/navigation';
import { apiUrl } from '../../../lib/api';
import { staticBlogs } from '../../../lib/staticBlogs';
import BlogTableOfContents from '../../components/BlogTableOfContents';
import { ContactCTA } from '../../about/page';

function cx(...classes) { return classes.filter(Boolean).join(' '); }

async function getPost(slug) {
  // First check static blogs
  const staticBlog = staticBlogs.find(blog => blog.slug === slug);
  if (staticBlog) {
    return staticBlog;
  }

  // Then try API
  try {
    console.log("sluggg from the ", slug);
    const url = apiUrl(`/api/v1/posts/${slug}`);
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });
    console.log('[BLOG DETAIL] Fetch:', url, 'status:', res.status);
    if (!res.ok) {
      if (res.status === 404) return null;
      console.error('Failed to fetch post:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Extract headings for TOC
function extractHeadings(content) {
  if (!content) return [];

  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  const headings = [];
  let match;
  let index = 0;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ''); // Remove HTML tags
    const id = `heading-${index}`;
    headings.push({ level, text, id });
    index++;
  }

  return headings;
}

// Inject IDs into headings
function injectHeadingIds(content, headings) {
  if (!content) return content;

  let modifiedContent = content;
  let index = 0;

  const headingRegex = /<h([2-3])([^>]*)>(.*?)<\/h\1>/gi;

  modifiedContent = modifiedContent.replace(headingRegex, (match, level, attrs, text) => {
    if (index < headings.length) {
      const id = headings[index].id;
      index++;
      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
    return match;
  });

  return modifiedContent;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const enhancedKeywords = [
    ...(post.tags || []),
    'data engineering',
    'AI automation',
    'machine learning',
    'business intelligence',
    'data analytics',
    'software development'
  ];

  return {
    title: `${post.title} | Eficsy Data Engineering & AI Blog`,
    description: post.excerpt || `${post.title} - Expert insights on data engineering, AI automation, and machine learning from Eficsy.`,
    keywords: enhancedKeywords,
    authors: [{ name: post.author?.name || 'Eficsy' }],
    alternates: {
      canonical: `https://eficsy.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author?.name || 'Eficsy'],
      tags: enhancedKeywords,
      images: [
        {
          url: post.coverImageUrl || '/eficwhite1.png',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      images: [post.coverImageUrl || '/eficwhite1.png'],
      creator: '@eficsy',
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  console.log("Params received in BlogPostPage:", resolvedParams);
  const { slug } = resolvedParams;
  const post = await getPost(slug);

  console.debug('Loaded post', post?.slug);

  if (!post) {
    notFound();
  }

  // Get content and extract headings
  const content = post.contentHtml || post.content || '';
  const headings = extractHeadings(content);
  const contentWithIds = injectHeadingIds(content, headings);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "image": post.coverImageUrl || "https://eficsy.com/eficwhite1.png",
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt || post.publishedAt || post.createdAt,
    "author": {
      "@type": "Organization",
      "name": post.author?.name || "Eficsy"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Eficsy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://eficsy.com/eficwhite1.png"
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero Section */}
      <header className="relative h-[60vh] w-full overflow-hidden">
        {post.coverImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-5xl mx-auto px-6 lg:px-12 pb-16">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-green-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                {post.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-4xl">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                {(post.author?.name || 'E')[0]}
              </div>
              <div>
                <div className="font-semibold">{post.author?.name || 'Eficsy Team'}</div>
                <div className="text-sm text-white/70">Author</div>
              </div>
            </div>

            <div className="h-8 w-px bg-white/30" />

            <div>
              <div className="font-semibold">
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-sm text-white/70">Published</div>
            </div>

            {post.readTime && (
              <>
                <div className="h-8 w-px bg-white/30" />
                <div>
                  <div className="font-semibold">{post.readTime} min</div>
                  <div className="text-sm text-white/70">Read time</div>
                </div>
              </>
            )}
          </div>
        </div>

      
      </header>

      {/* Content Section with TOC */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20">
          {/* Table of Contents - Left Side (Sticky) */}
          <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-32">
              <BlogTableOfContents headings={headings} />
            </div>
          </div>

          {/* Main Article Content */}
          <article className="flex-1 w-full lg:flex-[3] xl:max-w-none 2xl:max-w-none">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-100">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content */}
            {contentWithIds ? (
              <div
                className="article-content prose prose-lg prose-slate max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-32
                  prose-h2:text-3xl prose-h2:text-gray-900 prose-h2:mt-16 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:text-gray-900 prose-h3:mt-10 prose-h3:mb-4
                  prose-p:text-gray-600 prose-p:leading-8 prose-p:mb-8
                  prose-a:text-green-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-green-800 hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  prose-code:text-green-700 prose-code:bg-green-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-gray-900 prose-pre:text-gray-50 prose-pre:rounded-2xl prose-pre:shadow-lg prose-pre:p-6 prose-pre:my-10
                  prose-ul:text-gray-600 prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:text-gray-600 prose-ol:my-8 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:my-3 prose-li:pl-2
                  prose-table:text-sm prose-table:my-10 prose-table:w-full prose-table:border-collapse
                  prose-th:text-left prose-th:p-4 prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-900 prose-th:border-b prose-th:border-gray-200
                  prose-td:p-4 prose-td:border-b prose-td:border-gray-100 prose-td:text-gray-600
                  prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-12 prose-img:w-full prose-img:object-cover
                  prose-blockquote:border-l-4 prose-blockquote:border-green-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:my-10"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />
            ) : (
              <p className="text-gray-500 text-center py-12">This post has no content yet.</p>
            )}

            {/* Share Section */}
            <div className="mt-20 pt-10 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Share this article</h3>
              <div className="flex gap-4">
                <button className="px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center gap-2 text-sm font-medium">
                  <span>Twitter</span>
                </button>
                <button className="px-6 py-2.5 bg-[#0077b5] text-white rounded-full hover:bg-[#006396] transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center gap-2 text-sm font-medium">
                  <span>LinkedIn</span>
                </button>
                <button className="px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md flex items-center gap-2 text-sm font-medium">
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Related Articles / CTA */}
      <ContactCTA />
    </main>
  );
}

// Optional: Generate static paths for better performance
export async function generateStaticParams() {
  try {
    const url = apiUrl('/api/v1/posts?limit=100&published=true');
    const res = await fetch(url);
    if (!res.ok) return staticBlogs.map(post => ({ slug: post.slug }));
    const data = await res.json();
    const posts = data.data?.items || [];
    return [...staticBlogs.map(p => ({ slug: p.slug })), ...posts.map((post) => ({
      slug: post.slug,
    }))];
  } catch (error) {
    console.error('Failed to generate static params for posts:', error);
    return staticBlogs.map(post => ({ slug: post.slug }));
  }
}
