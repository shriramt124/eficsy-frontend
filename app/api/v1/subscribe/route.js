
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, serverError } from '../_utils';

export async function POST(req) {
  try {
    const db = await getConnection();
    const body = await req.json();
    const id = generateId();
    
    // Check if email already exists
    const [[existing]] = await db.query('SELECT id FROM subscribers WHERE email = ?', [body.email]);
    
    if (existing) {
      return json({ ok: true, id: existing.id, message: 'Already subscribed' });
    }
    
    await db.query(
      'INSERT INTO subscribers (id, email) VALUES (?, ?)',
      [id, body.email]
    );
    
    return json({ ok: true, id }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
