import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';
import validationMiddleware from '../libraries/middlewares/validation.middleware.js';
import announcementPostSchema from '../schemas/announcement.schema.js';

export const router = Router();

router.route('/')
    .get(announcementController.searchAnnouncement)
    .post(validationMiddleware(announcementPostSchema, 'body'),announcementController.store);
router.route('/highlight')
    .get(announcementController.getHighlight);
router.route('/:id')
    .get(announcementController.show)
    .delete(announcementController.deleteAnnouncementAndRelatedTypes)
    .patch(announcementController.update);
