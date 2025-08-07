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
router.get('/:id', fileController.getFileById);
router.delete('/:id', fileController.deleteFile);

export default router;