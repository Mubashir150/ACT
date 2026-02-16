import express from 'express';
import { getTemplate,submitAssessment } from '../controllers/assessmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/template/:code', getTemplate);
router.post('/submit',authMiddleware, submitAssessment); 

export default router;