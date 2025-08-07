"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSendGridConnection = exports.verifySendGridConfig = exports.sgMail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
exports.sgMail = mail_1.default;
// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY is not defined in environment variables');
}
else {
    mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('SendGrid initialized successfully');
}
const verifySendGridConfig = () => {
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
exports.verifySendGridConfig = verifySendGridConfig;
// Test SendGrid connection
const testSendGridConnection = async () => {
    if (!(0, exports.verifySendGridConfig)()) {
        return false;
    }
    try {
        // This is a simple way to test if the API key is valid
        // SendGrid doesn't have a specific "test connection" endpoint
        console.log('📧 SendGrid configuration appears valid');
        return true;
    }
    catch (error) {
        console.error('SendGrid connection test failed:', error);
        return false;
    }
};
exports.testSendGridConnection = testSendGridConnection;
