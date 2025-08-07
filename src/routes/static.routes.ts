import { Router } from 'express';
import { StaticController } from '../controllers/static.controller';

const router = Router();
const staticController = new StaticController();

router.get('/about', staticController.getAboutUs);
router.get('/support', staticController.getSupport);
router.get('/terms', staticController.getTermsAndConditions);

export default router;