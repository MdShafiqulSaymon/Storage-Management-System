import { Response } from 'express';
import { AuthRequest } from '../types';
import { FileService } from '../services/file.service';

const fileService = new FileService();

export class FileController {
  async uploadFile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const file = await fileService.uploadFile(req.user!.id, req.file);

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        file,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async createNote(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const note = await fileService.createNote(req.user!.id, title, content);

      res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getAllFiles(req: AuthRequest, res: Response): Promise<void> {
    try {
      const files = await fileService.getAllFiles(req.user!.id);

      res.json({
        success: true,
        count: files.length,
        files,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getImages(req: AuthRequest, res: Response): Promise<void> {
    try {
      const images = await fileService.getFilesByType(req.user!.id, 'image');

      res.json({
        success: true,
        count: images.length,
        images,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getPdfs(req: AuthRequest, res: Response): Promise<void> {
    try {
      const pdfs = await fileService.getFilesByType(req.user!.id, 'pdf');

      res.json({
        success: true,
        count: pdfs.length,
        pdfs,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getNotes(req: AuthRequest, res: Response): Promise<void> {
    try {
      const notes = await fileService.getFilesByType(req.user!.id, 'note');

      res.json({
        success: true,
        count: notes.length,
        notes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getFileById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const file = await fileService.getFileById(req.user!.id, req.params.id);
      
      if (!file) {
        res.status(404).json({ error: 'File not found' });
        return;
      }

      res.json({
        success: true,
        file,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async deleteFile(req: AuthRequest, res: Response): Promise<void> {
    try {
      await fileService.deleteFile(req.user!.id, req.params.id);

      res.json({
        success: true,
        message: 'File deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}