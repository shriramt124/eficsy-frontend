
export function getContactEmailHtml({ name, email, services, project, message }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #047857 0%, #065f46 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-row { margin: 15px 0; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #047857; }
          .label { font-weight: bold; color: #047857; margin-bottom: 5px; }
          .value { color: #374151; }
          .services-list { list-style: none; padding: 0; }
          .services-list li { padding: 8px 12px; margin: 5px 0; background: #e8f5e9; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new inquiry</p>
          </div>
          <div class="content">
            <div class="info-row">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Email</div>
              <div class="value">${email}</div>
            </div>
            
            ${project ? `
              <div class="info-row">
                <div class="label">Project/Subject</div>
                <div class="value">${project}</div>
              </div>
            ` : ''}
            
            ${services && services.length > 0 ? `
              <div class="info-row">
                <div class="label">Interested Services</div>
                <ul class="services-list">
                  ${services.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            ${message ? `
              <div class="info-row">
                <div class="label">Message</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            ` : ''}
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
              This email was sent from your contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function getContactEmailText({ name, email, services, project, message }) {
  let text = `New Contact Form Submission\n\n`;
  text += `Name: ${name}\n`;
  text += `Email: ${email}\n`;
  if (project) text += `Project/Subject: ${project}\n`;
  if (services && services.length > 0) {
    text += `Interested Services:\n${services.map(s => `  - ${s}`).join('\n')}\n`;
  }
  if (message) text += `\nMessage:\n${message}\n`;
  text += `\n---\nReceived at: ${new Date().toLocaleString()}`;
  return text;
}
