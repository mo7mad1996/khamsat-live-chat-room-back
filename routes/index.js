import express from "express";
const router = express.Router();

import authRouter from "./authRouter.js";
import messagesRouter from "./messagesRouter.js";
import groupRouter from "./groupRouter.js";

router.use("/", authRouter);
router.use("/messages", messagesRouter);
router.use("/groups", groupRouter);

export default router;
