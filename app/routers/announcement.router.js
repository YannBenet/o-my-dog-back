import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';

const announcementRouter = Router();

announcementRouter.route('/').get(announcementController.searchAnnouncement)
announcementRouter.route('/highlight').get(announcementController.getHighlight);


export default announcementRouter;