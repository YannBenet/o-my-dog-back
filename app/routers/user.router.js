import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import userPostSchema from '../schemas/user.post.schema.js';
import loginPostSchema from '../schemas/login.post.schema.js';
import auth from '../libraries/middlewares/auth.middleware.js';
import cw from '../libraries/middlewares/controllerWrapper.middleware.js'

export const router = Router();

router.route('/signin')
  .post(
    validationMiddleware(userPostSchema, 'body'),
    cw(userController.store)
  );

router.route('/login')
  .post(
    validationMiddleware(loginPostSchema, 'body'),
    cw(userController.login)
  );

router.route('/:id(\\d+)')
  .get(
    auth(), 
    cw(userController.show)
  )
  .delete(
    auth(),
    cw(userController.destroy)
  );

