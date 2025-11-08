import dbConnect from '@/lib/mongoose';
import ContactMessage from '@/models/ContactMessage';
import { badRequest, json, serverError } from '../_utils';
import { Resend } from 'resend';
import { getContactEmailHtml, getContactEmailText } from '@/lib/email-templates';

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
    
    // Send email notification if Resend is configured
    if (resend && process.env.CONTACT_EMAIL_TO) {
      try {
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM || 'noreply@eficsy.com',
          to: process.env.CONTACT_EMAIL_TO,
          subject: `New Contact Form Submission from ${body.name}`,
          html: getContactEmailHtml(body),
          text: getContactEmailText(body),
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    }
    
    return json({ ok: true, id: item._id });
  } catch (e) {
    return serverError(e);
  }
}
