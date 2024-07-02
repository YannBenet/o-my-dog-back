import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';

export const router = Router();

router.route('/').get(announcementController.searchAnnouncement);
router.route('/highlight').get(announcementController.getHighlight);
router.route('/:id').get(announcementController.getOneAnnouncement);
router.route('/:id').delete(announcementController.deleteAnnouncementAndRelatedTypes);
router.route('/:id').patch(announcementController.updateAnnouncement);