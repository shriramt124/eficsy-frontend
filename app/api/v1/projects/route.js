
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, parsePagination, serverError } from '../_utils';

export async function GET(req) {
  try {
    const db = await getConnection();
    const url = new URL(req.url);
    const { skip, limit, page, pageSize } = parsePagination(url);
    
    const [rows] = await db.query(
      'SELECT * FROM projects ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, skip]
    );
    
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM projects');
    
    const items = rows.map(row => ({
      id: row.id,
      title: row.title,
      tag: row.tag,
      summary: row.summary,
      imageUrl: row.image_url,
      createdAt: row.created_at
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
      'INSERT INTO projects (id, title, tag, summary, image_url) VALUES (?, ?, ?, ?, ?)',
      [id, body.title, body.tag || null, body.summary || null, body.imageUrl || null]
    );
    
    return json({ id, ...body }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
