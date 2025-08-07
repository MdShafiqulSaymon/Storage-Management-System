import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IFile extends Document {
  userId: string;
  filename: string;
  originalName: string;
  fileType: 'image' | 'pdf' | 'note' | 'other';
  mimeType: string;
  size: number;
  url: string;
  cloudinaryId: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResetToken extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}