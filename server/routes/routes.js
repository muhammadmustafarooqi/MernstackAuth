import express from 'express';
import authRoutes from './authRoutes.js';
import userRouter from './userRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRouter);

export default router;