import { Router } from 'express';
import userController from '../controllers/user.controller.js';

const router = Router();

router.route('/highlight').get(userController.getHighlight);


export default router;