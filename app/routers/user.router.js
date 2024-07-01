import { Router } from 'express';

import userController from '../controllers/user.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import userPostSchema from '../schemas/user.post.schema.js';

export const router = Router();

router.route('/users')
  .post(validationMiddleware(userPostSchema, 'body'),
  userController.store);