import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';

export const router = Router();

router.route('/').get(announcementController.searchAnnouncement)
router.route('/highlight').get(announcementController.getHighlight);