import { Router } from 'express';
import { router as announcementRouter } from './announcement.router.js';
import { router as userRouter } from './user.router.js';
import { router as animalRouter } from './animal.router.js';
import ApiError from '../libraries/errors/api.error.js';
import errorHandler from '../libraries/middlewares/errorhandler.middleware.js';
// import mainController from '../controllers/main.controller.js';

export const router = Router();

// router.route('/')
//   .get(mainController.index);
router.use('/api/announcements', announcementRouter);
router.use('/api/users', userRouter);
router.use('/api/animals', animalRouter);

router.use((_, res, next) => {
  next(new ApiError('Ressource not found', {status: 404}));
});

router.use(errorHandler);