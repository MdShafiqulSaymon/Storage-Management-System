import { Request, Response, NextFunction } from 'express';
import { isValidFileType } from '../utils/validators';

export const validateFile = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  if (!isValidFileType(req.file.mimetype)) {
    res.status(400).json({ error: 'Invalid file type' });
    return;
  }

  // Check file size (10MB limit)
  if (req.file.size > 10 * 1024 * 1024) {
    res.status(400).json({ error: 'File size exceeds 10MB limit' });
    return;
  }

  next();
};

export const handleUploadError = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ error: 'File size too large' });
      return;
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      res.status(400).json({ error: 'Too many files' });
      return;
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).json({ error: 'Unexpected field' });
      return;
    }
    res.status(500).json({ error: 'Upload failed' });
    return;
  }
  next();
};