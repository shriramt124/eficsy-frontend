
import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, serverError } from '../_utils';

export async function GET() {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM job_postings WHERE is_open = TRUE ORDER BY created_at DESC');
    
    const items = rows.map(row => ({
      id: row.id,
      title: row.title,
      department: row.department,
      location: row.location,
      type: row.type,
      description: row.description,
      isOpen: row.is_open
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
      'INSERT INTO job_postings (id, title, department, location, type, description, is_open) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, body.title, body.department || null, body.location || null, body.type || null, body.description, body.isOpen !== false]
    );
    
    return json({ id, ...body }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}
