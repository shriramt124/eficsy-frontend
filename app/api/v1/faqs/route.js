
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, serverError } from '../_utils';

export async function GET() {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM faqs ORDER BY display_order ASC, created_at ASC');
    
    const items = rows.map(row => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      order: row.display_order
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
      'INSERT INTO faqs (id, question, answer, display_order) VALUES (?, ?, ?, ?)',
      [id, body.question, body.answer, body.order || 0]
    );
    
    return json({ id, ...body }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
