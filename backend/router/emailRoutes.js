import { Router } from 'express';
import { emailScheduler, getEmailScheduled } from '../controllers/email.js';

const router = Router();

router.post('/', emailScheduler);
router.get('/', getEmailScheduled);

export default router;
