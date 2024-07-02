import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import userPostSchema from '../schemas/user.post.schema.js';
import loginPostSchema from '../schemas/login.post.schema.js';
import auth from '../libraries/middlewares/auth.middleware.js';

export const router = Router();

router.route('/')
  .post(validationMiddleware(userPostSchema, 'body'),
  userController.store);

router.route('/login')
  .post(validationMiddleware(loginPostSchema, 'body'),
  userController.login);

router.route('/:id(\\d+)')
  .get(auth(), 
  userController.show);
