import { Router } from "express";
import { router as announcementRouter } from "./announcement.router.js";
import { router as userRouter } from "./user.router.js";

const router = Router();
router.use('/api/announcements', announcementRouter);
router.use('/api/users', userRouter);

export default router;