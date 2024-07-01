import { Router } from "express";
import announcementRouter from "./announcement.router.js";
import userRouter from "./user.router.js";

const router = Router();

router.use('/api/announcements', announcementRouter);
router.use('/api/users', userRouter);

export default router;