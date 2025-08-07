import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.model';
import ResetToken from '../models/resetToken.model';
import { IUser } from '../types';

export class AuthService {
  generateToken(user: IUser): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    
    const options: SignOptions = {
      expiresIn: 60 * 60 * 24 * 7 
    };
    
    return jwt.sign(
      { id: user._id, email: user.email },
      secret,
      options
    );
  }

  async signup(username: string, email: string, password: string): Promise<{ user: IUser; token: string }> {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password });
    const token = this.generateToken(user);

    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });
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

  async forgotPassword(email: string): Promise<string> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await ResetToken.create({
      userId: user._id,
      token: hashedToken,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    });

    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
    const resetToken = await ResetToken.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });

    if (!resetToken) {
      throw new Error('Invalid or expired token');
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    await user.save();
    await ResetToken.deleteOne({ _id: resetToken._id });
  }
}