import File from '../models/file.model';
import cloudinary from '../config/cloudinary';
import { IFile } from '../types';

export class FileService {
  determineFileType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.startsWith('text/')) return 'note';
    return 'other';
  }

  async uploadFile(userId: string, file: Express.Multer.File): Promise<IFile> {
    const fileType = this.determineFileType(file.mimetype);
    
    const newFile = await File.create({
      userId,
      filename: file.filename,
      originalName: file.originalname,
      fileType,
      mimeType: file.mimetype,
      size: file.size,
      url: (file as any).path,
      cloudinaryId: (file as any).filename,
    });

    return newFile;
  }

  async createNote(userId: string, title: string, content: string): Promise<IFile> {
    const note = await File.create({
      userId,
      filename: title,
      originalName: title,
      fileType: 'note',
      mimeType: 'text/plain',
      size: content.length,
      url: 'note',
      cloudinaryId: `note_${Date.now()}`,
      content,
    });

    return note;
  }

  async getAllFiles(userId: string): Promise<IFile[]> {
    return File.find({ userId }).sort({ createdAt: -1 });
  }

  async getFilesByType(userId: string, fileType: string): Promise<IFile[]> {
    return File.find({ userId, fileType }).sort({ createdAt: -1 });
  }

  async getFileById(userId: string, fileId: string): Promise<IFile | null> {
    return File.findOne({ _id: fileId, userId });
  }
  async getFilesByDate(userId: string, date: string): Promise<IFile[]> {
    // Create date objects in UTC
    const startOfDay = new Date(date + 'T00:00:00.000Z');
    const endOfDay = new Date(date + 'T23:59:59.999Z');

    console.log('Searching files between:', startOfDay, 'and', endOfDay);

    const files = await File.find({
      userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ createdAt: -1 });

    console.log('Found files:', files.length);
    return files;
  }

  async getFilesByDateRange(userId: string, startDate: string, endDate: string): Promise<IFile[]> {
    // Create date objects in UTC
    const start = new Date(startDate + 'T00:00:00.000Z');
    const end = new Date(endDate + 'T23:59:59.999Z');

    console.log('Date range search:', start, 'to', end);

    return File.find({
      userId,
      createdAt: {
        $gte: start,
        $lte: end
      }
    }).sort({ createdAt: -1 });
  }

  async getFilesGroupedByDate(userId: string, year: number, month: number): Promise<any> {
    // MongoDB uses 0-indexed months in JavaScript Date
    const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

    console.log('Calendar search for:', startDate, 'to', endDate);

    const files = await File.find({
      userId,
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ createdAt: -1 });

    // Group files by date
    const groupedFiles: { [key: string]: IFile[] } = {};
    
    files.forEach(file => {
      // Get the date in YYYY-MM-DD format
      const fileDate = new Date(file.createdAt);
      const dateKey = `${fileDate.getFullYear()}-${String(fileDate.getMonth() + 1).padStart(2, '0')}-${String(fileDate.getDate()).padStart(2, '0')}`;
      
      if (!groupedFiles[dateKey]) {
        groupedFiles[dateKey] = [];
      }
      groupedFiles[dateKey].push(file);
    });

    return groupedFiles;
  }

  async deleteFile(userId: string, fileId: string): Promise<void> {
    const file = await File.findOne({ _id: fileId, userId });
    
    if (!file) {
      throw new Error('File not found');
    }

    if (file.fileType !== 'note' && file.cloudinaryId && !file.cloudinaryId.startsWith('note_')) {
      try {
        await cloudinary.uploader.destroy(file.cloudinaryId);
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
      }
    }

    await File.deleteOne({ _id: fileId });
  }
}