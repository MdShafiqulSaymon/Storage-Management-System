"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = __importDefault(require("../models/user.model"));
const resetToken_model_1 = __importDefault(require("../models/resetToken.model"));
class AuthService {
    generateToken(user) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const options = {
            expiresIn: 60 * 60 * 24 * 7
        };
        return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, secret, options);
    }
    async signup(username, email, password) {
        const existingUser = await user_model_1.default.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = await user_model_1.default.create({ username, email, password });
        const token = this.generateToken(user);
        return { user, token };
    }
    async login(email, password) {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user);
        return { user, token };
    }
    async forgotPassword(email) {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const hashedToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
        await resetToken_model_1.default.create({
            userId: user._id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 3600000), // 1 hour
        });
        return resetToken;
    }
    async resetPassword(token, newPassword) {
        const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
        const resetToken = await resetToken_model_1.default.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
        });
        if (!resetToken) {
            throw new Error('Invalid or expired token');
        }
        const user = await user_model_1.default.findById(resetToken.userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.password = newPassword;
        await user.save();
        await resetToken_model_1.default.deleteOne({ _id: resetToken._id });
    }
}
exports.AuthService = AuthService;
