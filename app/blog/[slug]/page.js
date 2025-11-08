import Image from 'next/image';
import { notFound } from 'next/navigation';
import { apiUrl } from '../../../lib/api';
function cx(...classes) { return classes.filter(Boolean).join(' '); }

async function getPost(slug) {
  try {
    console.log("sluggg from the ",slug);
    // Fetch from the admin/backend app running on port 3000
    const url = apiUrl(`/api/v1/posts/${slug}`);
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });
    console.log('[BLOG DETAIL] Fetch:', url, 'status:', res.status);
    // console.debug('Post fetch status:', res.status);
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

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  console.log("Params received in BlogPostPage:", resolvedParams);
  const { slug } = resolvedParams;
  const post = await getPost(slug);

  console.debug('Loaded post', post?.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Post Header */}
      <header className="relative h-[40vh] sm:h-[50vh] w-full">
        {post.coverImageUrl && (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end max-w-4xl mx-auto p-6 lg:p-12">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-white/80 text-sm">
            <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {post.readTime && <span>•</span>}
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="max-w-3xl mx-auto p-6 lg:p-12">
        {post.contentHtml ? (
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        ) : (
          <p>This post has no content yet.</p>
        )}
      </article>
    </main>
  );
}

// Optional: Generate static paths for better performance
export async function generateStaticParams() {
  try {
    // Use backend on port 3000 for static params too
  const url = apiUrl('/api/v1/posts?limit=100&published=true');
  const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const posts = data.data?.items || [];
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params for posts:', error);
    return [];
  }
}
