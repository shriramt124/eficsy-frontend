
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, serverError } from '../_utils';

export async function GET() {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    
    const items = rows.map(row => ({
      id: row.id,
      name: row.name,
      role: row.role,
      avatar: row.avatar,
      text: row.text
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
      'INSERT INTO testimonials (id, name, role, avatar, text) VALUES (?, ?, ?, ?, ?)',
      [id, body.name, body.role || null, body.avatar || null, body.text]
    );
    
    return json({ id, ...body }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
