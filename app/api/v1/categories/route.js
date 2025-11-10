
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, serverError } from '../_utils';

export async function GET() {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM categories ORDER BY name ASC');
    
    const items = rows.map(row => ({
      id: row.id,
      slug: row.slug,
      name: row.name
    }));
    
    return json({ items });
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
      'INSERT INTO categories (id, slug, name) VALUES (?, ?, ?)',
      [id, body.slug, body.name]
    );
    
    return json({ id, ...body }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
