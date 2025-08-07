"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
class UserController {
    async getProfile(req, res) {
        try {
            const user = await userService.getUserProfile(req.user.id);
            res.json({
                success: true,
                user,
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    }
    async updateProfile(req, res) {
        try {
            const user = await userService.updateProfile(req.user.id, req.body);
            res.json({
                success: true,
                message: 'Profile updated successfully',
                user,
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            await userService.changePassword(req.user.id, currentPassword, newPassword);
            res.json({
                success: true,
                message: 'Password changed successfully',
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
exports.UserController = UserController;
