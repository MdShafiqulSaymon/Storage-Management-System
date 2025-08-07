import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { 
  signupValidation, 
  loginValidation, 
  validateRequest 
} from '../middleware/validation.middleware';

const router = Router();
const authController = new AuthController();

router.post('/signup', signupValidation, validateRequest, authController.signup);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export default router;