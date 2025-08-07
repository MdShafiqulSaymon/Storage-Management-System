"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticController = void 0;
class StaticController {
    getAboutUs(req, res) {
        res.json({
            success: true,
            data: {
                name: 'Storage Management System',
                version: '1.0.0',
                description: 'A secure cloud storage system for managing your files',
                features: [
                    'Secure file upload',
                    'Multiple file type support',
                    'Note creation',
                    'File organization',
                    'User authentication',
                ],
            },
        });
    }
    getSupport(req, res) {
        res.json({
            success: true,
            data: {
                email: 'support@storagemanagement.com',
                phone: '+1-234-567-8900',
                hours: 'Monday-Friday 9AM-5PM EST',
                response_time: '24-48 hours',
            },
        });
    }
    getTermsAndConditions(req, res) {
        res.json({
            success: true,
            data: {
                version: '1.0',
                lastUpdated: '2024-01-01',
                terms: [
                    'By using this service, you agree to our terms',
                    'We respect your privacy and data',
                    'Files are stored securely in the cloud',
                    'You retain ownership of your uploaded content',
                    'We reserve the right to remove inappropriate content',
                ],
            },
        });
    }
}
exports.StaticController = StaticController;
