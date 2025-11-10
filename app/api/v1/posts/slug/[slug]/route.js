
import getConnection from '@/lib/mysql';
import { json, notFound, serverError } from '../../../_utils';

export async function GET(_req, { params }) {
  try {
    const db = await getConnection();
    const [rows] = await db.query(
      `SELECT p.*, GROUP_CONCAT(c.slug) as category_slugs, GROUP_CONCAT(c.name) as category_names
       FROM posts p
       LEFT JOIN post_categories pc ON p.id = pc.post_id
       LEFT JOIN categories c ON pc.category_id = c.id
       WHERE p.slug = ?
       GROUP BY p.id`,
      [params.slug]
    );
    
    if (rows.length === 0) return notFound('Post not found');
    
    const post = {
      id: rows[0].id,
      slug: rows[0].slug,
      title: rows[0].title,
      excerpt: rows[0].excerpt,
      content: rows[0].content,
      coverUrl: rows[0].cover_url,
      readTimeMin: rows[0].read_time_min,
      published: rows[0].published,
      publishedAt: rows[0].published_at,
      categories: rows[0].category_slugs ? rows[0].category_slugs.split(',').map((slug, i) => ({
        slug,
        name: rows[0].category_names.split(',')[i]
      })) : []
    };
    
    return json(post);
  } catch (e) {
    return serverError(e);
  }
}
