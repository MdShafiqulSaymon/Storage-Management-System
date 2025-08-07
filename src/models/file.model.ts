import mongoose, { Schema } from 'mongoose';
import { IFile } from '../types';

const fileSchema = new Schema<IFile>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['image', 'pdf', 'note', 'other'],
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: false,
      default: '',
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFile>('File', fileSchema);