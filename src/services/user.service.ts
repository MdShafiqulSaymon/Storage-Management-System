import User from '../models/user.model';
import { IUser } from '../types';
import bcrypt from 'bcryptjs';

export class UserService {
  async getUserProfile(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId).select('-password');
    return user as IUser | null;
  }

  async updateProfile(userId: string, updates: Partial<IUser>): Promise<IUser | null> {
    const allowedUpdates = ['username', 'email'];
    const filteredUpdates: any = {};
    
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key as keyof IUser];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      filteredUpdates,
      { new: true, runValidators: true }
    ).select('-password');
    
    return user as IUser | null;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(userId);
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