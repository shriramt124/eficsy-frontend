import getConnection from '@/lib/mysql';
import { generateId } from '@/lib/mysql-helpers';
import { json, serverError } from '../_utils';

export async function POST(req) {
  try {
    const db = await getConnection();
    const body = await req.json();
    const id = generateId();

    await db.query(
      `INSERT INTO contact_messages (id, name, email, services, project, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.email,
        JSON.stringify(body.services || []),
        body.project || null,
        body.message || null
      ]
    );

    return json({ ok: true, id }, { status: 201 });
  } catch (e) {
    return serverError(e);
  }
}