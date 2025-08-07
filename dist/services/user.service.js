"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    async getUserProfile(userId) {
        const user = await user_model_1.default.findById(userId).select('-password');
        return user;
    }
    async updateProfile(userId, updates) {
        const allowedUpdates = ['username', 'email'];
        const filteredUpdates = {};
        Object.keys(updates).forEach(key => {
            if (allowedUpdates.includes(key)) {
                filteredUpdates[key] = updates[key];
            }
        });
        const user = await user_model_1.default.findByIdAndUpdate(userId, filteredUpdates, { new: true, runValidators: true }).select('-password');
        return user;
    }
    async changePassword(userId, currentPassword, newPassword) {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }
        user.password = newPassword;
        await user.save();
    }
}
exports.UserService = UserService;
