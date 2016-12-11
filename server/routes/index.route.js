import express from 'express';
import userRoutes from './User.route';
import authRoutes from './auth.route';
import shredRoutes from './Shred.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

router.use('/shreds',shredRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
