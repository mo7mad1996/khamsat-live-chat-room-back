import express from "express";
const router = express.Router();

// controller
import messagesController from "../controllers/messagesController.js";

router.get("/", messagesController.all);

export default router;
