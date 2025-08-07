"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
const authService = new auth_service_1.AuthService();
const emailService = new email_service_1.EmailService();
class AuthController {
    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            const { user, token } = await authService.signup(username, email, password);
            // Send welcome email
            await emailService.sendWelcomeEmail(email, username);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await authService.login(email, password);
            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                error: error.message,
            });
        }
    }
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const resetToken = await authService.forgotPassword(email);
            await emailService.sendResetPasswordEmail(email, resetToken);
            res.json({
                success: true,
                message: 'Password reset email sent Do not forget to check spam also',
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            await authService.resetPassword(token, newPassword);
            res.json({
                success: true,
                message: 'Password reset successful',
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
}
exports.AuthController = AuthController;
