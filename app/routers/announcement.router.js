import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import announcementPostSchema from '../schemas/announcement.schema.js';
import cw from '../libraries/middlewares/controllerWrapper.middleware.js';
import auth from '../libraries/middlewares/auth.middleware.js'

export const router = Router();

router.route('/')
  .get(
    cw(announcementController.searchAnnouncement)
  );

router.route('/users/:id')
  .post(
    auth(),
    validationMiddleware(announcementPostSchema, 'body'),
    cw(announcementController.store)
  );

router.route('/highlight')
  .get(
    cw(announcementController.getHighlight)
  );

router.route('/:id')
  .get(
    auth(),
    cw(announcementController.show)
  )
  .delete(
    auth(),
    cw(announcementController.delete)
  )
  .patch(
    auth(),
    cw(announcementController.update)
  );
