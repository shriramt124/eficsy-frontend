import dbConnect from '@/lib/mongoose';
import ContactMessage from '@/models/ContactMessage';
import { badRequest, json, serverError } from '../_utils';
import { Resend } from 'resend';
import { getContactEmailHtml, getContactEmailText } from '@/lib/email-templates';

// Resend-only implementation (one-way notification). Simpler & easier to debug.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body?.name || !body?.email) return badRequest('name and email are required');
    
    const item = await ContactMessage.create({
      name: body.name,
      email: body.email,
      services: body.services || [],
      project: body.project || body.subject || undefined,
      message: body.message || undefined,
    });
    
    const to = process.env.CONTACT_EMAIL_TO;
    const from = process.env.CONTACT_EMAIL_FROM || 'noreply@eficsy.com';
    const subject = `New Contact Form: ${body.name}`;
    const html = getContactEmailHtml(body);
    const text = getContactEmailText(body);

    if (!resend) {
      console.warn('[contact] RESEND_API_KEY missing: email not sent. Stored only.');
    } else if (!to) {
      console.warn('[contact] CONTACT_EMAIL_TO missing: email not sent.');
    } else {
      try {
        const sendResult = await resend.emails.send({
          from,
          to,
          replyTo: body.email,
            subject,
          html,
          text,
        });
        if (sendResult.error) {
          console.error('[contact] Resend API error:', sendResult.error);
        } else {
          console.log('[contact] Resend email sent id:', sendResult.data?.id);
        }
      } catch (err) {
        console.error('[contact] Resend send failed:', err);
      }
    }
    
    return json({ ok: true, id: item._id });
  } catch (e) {
    return serverError(e);
  }
}
