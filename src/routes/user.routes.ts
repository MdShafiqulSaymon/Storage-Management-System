import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
import { changePasswordValidation, validateRequest } from '../middleware/validation.middleware';

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticate);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/change-password', changePasswordValidation, validateRequest, userController.changePassword);

export default router;