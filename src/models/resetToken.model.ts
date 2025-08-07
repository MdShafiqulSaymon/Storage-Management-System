import mongoose, { Schema } from 'mongoose';
import { IResetToken } from '../types';

const resetTokenSchema = new Schema<IResetToken>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: Date.now() + 3600000, 
  },
});

export default mongoose.model<IResetToken>('ResetToken', resetTokenSchema);