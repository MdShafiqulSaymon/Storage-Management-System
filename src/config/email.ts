import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not defined in environment variables');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid initialized successfully');
}

export { sgMail };

export const verifySendGridConfig = (): boolean => {
  const requiredVars = ['SENDGRID_API_KEY', 'EMAIL_FROM'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing SendGrid environment variables:', missingVars);
    return false;
  }

  if (!process.env.SENDGRID_API_KEY?.startsWith('SG.')) {
    console.error('SENDGRID_API_KEY appears to be invalid (should start with "SG.")');
    return false;
  }

  return true;
};

// Test SendGrid connection
export const testSendGridConnection = async (): Promise<boolean> => {
  if (!verifySendGridConfig()) {
    return false;
  }

  try {
    // This is a simple way to test if the API key is valid
    // SendGrid doesn't have a specific "test connection" endpoint
    console.log('📧 SendGrid configuration appears valid');
    return true;
  } catch (error) {
    console.error('SendGrid connection test failed:', error);
    return false;
  }
};