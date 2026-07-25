const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send contact form notification email
const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    // Skip if email not configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log('Email not configured, skipping email notification');
      return false;
    }

    const transporter = createTransporter();

    // Email to admin
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4F46E5; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 8px; margin-top: 20px; }
            .info-row { margin-bottom: 15px; }
            .label { font-weight: bold; color: #4F46E5; }
            .message { background: white; padding: 20px; border-left: 4px solid #4F46E5; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Contact Message</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">From:</span> ${name}
              </div>
              <div class="info-row">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="info-row">
                <span class="label">Subject:</span> ${subject}
              </div>
              <div class="message">
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    throw error;
  }
};

module.exports = {
  sendContactEmail
};
