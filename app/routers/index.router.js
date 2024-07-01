import { Router } from 'express';

import { router as userRouter } from './user.router.js';
// import { router as announcementsRouter } from './annoucement.router.js';

export const router = Router();

router.use('/api/users', userRouter);
// router.use(announcementsRouter);
