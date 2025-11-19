import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface EmailRequest {
  name: string;
  email: string;
  reportCode: string;
  reportUrl: string;
  scores: {
    comm50: number;
    trust50: number;
    quadrant: string;
    position: string;
  };
}

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, reportCode, reportUrl, scores }: EmailRequest = JSON.parse(event.body || '{}');

    // Validate input
    if (!name || !email || !reportCode) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
              color: white;
              padding: 30px;
              border-radius: 8px;
              text-align: center;
              margin-bottom: 30px;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .score-box {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 15px 0;
              border-left: 4px solid #6366f1;
            }
            .button {
              display: inline-block;
              background: #6366f1;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #666;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Your MINDTRX Results</h1>
            <p>Inner Mind Integration Inventory (IMII)</p>
          </div>

          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for completing the Inner Mind Integration Inventory assessment. Your personalized results are ready!</p>

            <div class="score-box">
              <h3>Your Results</h3>
              <p><strong>Report Code:</strong> ${reportCode}</p>
              <p><strong>Quadrant:</strong> ${scores.quadrant}</p>
              <p><strong>Position:</strong> ${scores.position}</p>
              <p><strong>Communication Score:</strong> ${scores.comm50}/50</p>
              <p><strong>Trust Score:</strong> ${scores.trust50}/50</p>
            </div>

            <p>Your Communication score reflects how often you actively engage inner-mind practices. Your Trust score reflects how deeply you rely on inner guidance.</p>

            <div style="text-align: center;">
              <a href="${reportUrl}" class="button">View Full Report</a>
            </div>

            <p><small>You can access your full report anytime using the code: <strong>${reportCode}</strong></small></p>
          </div>

          <div class="footer">
            <p>MINDTRX - Inner Mind Integration</p>
            <p>This email was sent because you requested your assessment results.</p>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: `Your MINDTRX Results - ${scores.quadrant}`,
      html: htmlContent,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' }),
    };
  }
};
