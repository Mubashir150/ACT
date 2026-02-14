import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile); // Fetch user details
router.put('/profile', authMiddleware, updateUserProfile); // Edit and update user details

export default router;