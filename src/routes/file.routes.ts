import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../config/cloudinary';

const router = Router();
const fileController = new FileController();

// All routes require authentication
router.use(authenticate);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.post('/notes', fileController.createNote);
router.get('/all', fileController.getAllFiles);
router.get('/images', fileController.getImages);
router.get('/pdfs', fileController.getPdfs);
router.get('/notes', fileController.getNotes);

// Calendar/Date based routes
router.get('/date/:date', fileController.getFilesByDate); // Get files for specific date
router.get('/date-range', fileController.getFilesByDateRange); // Get files between dates
router.get('/calendar', fileController.getFilesCalendar);

router.get('/:id', fileController.getFileById);
router.delete('/:id', fileController.deleteFile);

export default router;