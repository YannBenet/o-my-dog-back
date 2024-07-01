import { Router } from "express";
import announcementRouter from "./announcement.router.js";
import userRouter from "./user.router.js";

const mainRouter = Router();

mainRouter.use('/announcements', announcementRouter);
mainRouter.use('/users', userRouter);

export default mainRouter;