import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import userPostSchema from '../schemas/user.post.schema.js';
import userUpdateSchema from '../schemas/user.update.schema.js';

export const router = Router();

router.route('/')
  .post(validationMiddleware(userPostSchema, 'body'),
  userController.store)
router.route('/:id(\\d+)')
  .patch(validationMiddleware(userUpdateSchema, 'body'),
userController.update)
