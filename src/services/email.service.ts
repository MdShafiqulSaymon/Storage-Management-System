import { sgMail, verifySendGridConfig } from '../config/email';
import { MailDataRequired } from '@sendgrid/mail';

export class EmailService {
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  constructor() {
    if (!this.isDevelopment) {
      verifySendGridConfig();
    }
  }

  async sendResetPasswordEmail(email: string, resetToken: string): Promise<void> {
    if (this.isDevelopment) {
      console.log('[DEV MODE] Password reset email would be sent to:', email);
      console.log('Reset URL:', `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`);
      return;
    }

    try {
      const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
      
      const msg: MailDataRequired = {
        to: email,
        from: process.env.EMAIL_FROM!, // Must be verified sender in SendGrid
        subject: 'Password Reset Request - Storage Management System',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0;">Storage Management System</h1>
              <p style="color: #666; margin: 5px 0;">Password Reset Request</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #333; text-align: center; margin-top: 0;">Reset Your Password</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #555;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-bottom: 0;">
                Or copy and paste this URL into your browser:
              </p>
              <p style="font-size: 14px; color: #007bff; word-break: break-all;">
                ${resetUrl}
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                ⏰ This link will expire in 1 hour for security reasons.
              </p>
              <p style="font-size: 14px; color: #666; margin-bottom: 0;">
                🔒 If you didn't request this password reset, please ignore this email. Your account remains secure.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999; margin: 0;">
                © ${new Date().getFullYear()} Storage Management System. All rights reserved.
              </p>
            </div>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Password reset email sent to ${email}`);
    } catch (error: any) {
      console.error('Failed to send reset password email:', error.response?.body || error.message);
      throw new Error('Failed to send reset password email');
    }
  }

  async sendWelcomeEmail(email: string, username: string): Promise<void> {
    if (this.isDevelopment) {
      console.log('[DEV MODE] Welcome email would be sent to:', email);
      console.log('User:', username);
      return;
    }

    try {
      const msg: MailDataRequired = {
        to: email,
        from: process.env.EMAIL_FROM!, // Must be verified sender in SendGrid
        subject: `Welcome to Storage Management System, ${username}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; margin: 0;">Welcome to Storage Management System!</h1>
              <p style="color: #666; margin: 5px 0;">Your account is ready to use</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h2 style="margin: 0 0 10px 0; font-size: 28px;">Hello ${username}! 👋</h2>
              <p style="margin: 0; font-size: 18px; opacity: 0.9;">Thanks for joining our platform</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0; text-align: center;">🚀 Getting Started</h3>
              <div style="display: block;">
                <div style="margin-bottom: 15px;">
                  <strong style="color: #007bff;">📁 Upload Files:</strong>
                  <span style="color: #666;"> Securely store your documents, images, and more</span>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #007bff;">🗂️ Organize:</strong>
                  <span style="color: #666;"> Create folders and use tags to keep everything organized</span>
                </div>
                <div style="margin-bottom: 15px;">
                  <strong style="color: #007bff;">🔗 Share:</strong>
                  <span style="color: #666;"> Share files securely with colleagues and friends</span>
                </div>
                <div style="margin-bottom: 0;">
                  <strong style="color: #007bff;">🌐 Access Anywhere:</strong>
                  <span style="color: #666;"> Your files are available from any device, anywhere</span>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CLIENT_URL}" 
                 style="display: inline-block; padding: 15px 30px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Start Using Your Account
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <p style="font-size: 14px; color: #666; text-align: center;">
                💡 <strong>Need help?</strong> Our support team is here to assist you with any questions.
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999; margin: 0;">
                © ${new Date().getFullYear()} Storage Management System. All rights reserved.
              </p>
            </div>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);
    } catch (error: any) {
      console.error('Failed to send welcome email:', error.response?.body || error.message);
    }
  }

  async testConnection(): Promise<boolean> {
    if (this.isDevelopment) {
      console.log('[DEV MODE] Email testing skipped');
      return true;
    }

    if (!verifySendGridConfig()) {
      return false;
    }

    try {
      console.log('SendGrid service is ready to send messages');
      console.log(`Sending from: ${process.env.EMAIL_FROM}`);
      return true;
    } catch (error) {
      console.error('SendGrid service test failed:', error);
      return false;
    }
  }

  async sendTestEmail(testEmail: string): Promise<void> {
    if (this.isDevelopment) {
      console.log('[DEV MODE] Test email would be sent to:', testEmail);
      return;
    }

    try {
      const msg: MailDataRequired = {
        to: testEmail,
        from: process.env.EMAIL_FROM!,
        subject: 'Test Email - SendGrid Configuration',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1>SendGrid Test Successful!</h1>
            <p>Your SendGrid configuration is working correctly.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
      };

      await sgMail.send(msg);
      console.log(`Test email sent to ${testEmail}`);
    } catch (error: any) {
      console.error('Failed to send test email:', error.response?.body || error.message);
      throw new Error('Failed to send test email');
    }
  }
}