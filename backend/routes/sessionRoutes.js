import express from 'express';
import { getSessionTemplate } from '../controllers/sessionController.js';

const router = express.Router();

// GET /api/templates/1, /api/templates/2, etc.
router.get('/:sessionNumber', getSessionTemplate);

export default router;