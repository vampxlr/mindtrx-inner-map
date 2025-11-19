import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface EmailRequest {
  name: string;
  email: string;
  reportCode: string;
  comm50: number;
  trust50: number;
  quadrant: string;
  position: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, reportCode, comm50, trust50, quadrant, position }: EmailRequest = req.body;

    if (!name || !email || !reportCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your MINDTRX Assessment Results',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your MINDTRX Results</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0614; color: #e0e0e0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #1c0f35;">
            <tr>
              <td style="padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #12051f 0%, #1c0f35 100%);">
                <h1 style="margin: 0; color: #00d9ff; font-size: 32px; font-weight: 700; text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);">MINDTRX</h1>
                <p style="margin: 10px 0 0; color: #a78bfa; font-size: 14px;">Inner Mind Integration Inventory</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="margin: 0 0 20px; color: #00d9ff; font-size: 24px;">Hello ${name},</h2>
                <p style="margin: 0 0 20px; color: #e0e0e0; font-size: 16px; line-height: 1.6;">
                  Thank you for completing the MINDTRX assessment. Here are your results:
                </p>
                
                <div style="background-color: #12051f; border: 1px solid #a78bfa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                  <p style="margin: 0 0 10px; color: #a78bfa; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Report Code</p>
                  <p style="margin: 0; color: #00d9ff; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace;">${reportCode}</p>
                </div>

                <div style="margin: 30px 0;">
                  <h3 style="margin: 0 0 15px; color: #00d9ff; font-size: 18px;">Your Scores</h3>
                  <table width="100%" cellpadding="10" style="border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; background-color: #12051f; border: 1px solid #a78bfa33;">
                        <p style="margin: 0; color: #a78bfa; font-size: 14px;">Communication</p>
                        <p style="margin: 5px 0 0; color: #00d9ff; font-size: 20px; font-weight: 700;">${comm50}/50</p>
                      </td>
                      <td style="padding: 10px; background-color: #12051f; border: 1px solid #a78bfa33;">
                        <p style="margin: 0; color: #a78bfa; font-size: 14px;">Trust</p>
                        <p style="margin: 5px 0 0; color: #00d9ff; font-size: 20px; font-weight: 700;">${trust50}/50</p>
                      </td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #12051f; border-left: 4px solid #00d9ff; padding: 20px; margin: 20px 0;">
                  <p style="margin: 0 0 5px; color: #a78bfa; font-size: 14px; text-transform: uppercase;">Your Quadrant</p>
                  <p style="margin: 0 0 10px; color: #00d9ff; font-size: 20px; font-weight: 700;">${quadrant}</p>
                  <p style="margin: 0; color: #a78bfa; font-size: 14px;">Position: ${position}</p>
                </div>

                <p style="margin: 30px 0 20px; color: #e0e0e0; font-size: 16px; line-height: 1.6;">
                  You can view your complete results anytime by visiting:
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.VERCEL_URL || 'https://mindtrx.app'}/results?code=${reportCode}" 
                     style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #a78bfa 0%, #00d9ff 100%); color: #0a0614; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; box-shadow: 0 0 20px rgba(167, 139, 250, 0.5);">
                    View Full Report
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; text-align: center; background-color: #12051f; border-top: 1px solid #a78bfa33;">
                <p style="margin: 0; color: #a78bfa; font-size: 14px; line-height: 1.6;">
                  © ${new Date().getFullYear()} MINDTRX. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log('Email sent successfully:', info.messageId);

    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId 
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
