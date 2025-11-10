
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, parsePagination, serverError } from '../_utils';

export async function GET(req) {
  try {
    const db = await getConnection();
    const url = new URL(req.url);
    const { skip, limit, page, pageSize } = parsePagination(url);
    
    const [rows] = await db.query(
      `SELECT p.*, GROUP_CONCAT(c.slug) as category_slugs, GROUP_CONCAT(c.name) as category_names
       FROM posts p
       LEFT JOIN post_categories pc ON p.id = pc.post_id
       LEFT JOIN categories c ON pc.category_id = c.id
       WHERE p.published = TRUE
       GROUP BY p.id
       ORDER BY p.published_at DESC
       LIMIT ? OFFSET ?`,
      [limit, skip]
    );
    
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM posts WHERE published = TRUE');
    
    const items = rows.map(row => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      coverUrl: row.cover_url,
      readTimeMin: row.read_time_min,
      publishedAt: row.published_at,
      categories: row.category_slugs ? row.category_slugs.split(',').map((slug, i) => ({
        slug,
        name: row.category_names.split(',')[i]
      })) : []
    }));
    
    return json({ items, page, pageSize, total });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(req) {
  try {
    const db = await getConnection();
    const body = await req.json();
    const id = generateId();
    
    await db.query(
      `INSERT INTO posts (id, slug, title, excerpt, content, cover_url, read_time_min, published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.slug,
        body.title,
        body.excerpt || null,
        body.content || '',
        body.coverUrl || null,
        body.readTimeMin || 3,
        body.published || false,
        body.publishedAt || null
      ]
    );
    
    // Handle categories
    if (body.categories && body.categories.length > 0) {
      for (const catSlug of body.categories) {
        const [[cat]] = await db.query('SELECT id FROM categories WHERE slug = ?', [catSlug]);
        if (cat) {
          await db.query(
            'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
            [id, cat.id]
          );
        }
      }
    }
    
    return json({ id, ...body }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
