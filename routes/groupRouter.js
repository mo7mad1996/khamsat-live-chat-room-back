import express from "express";
const router = express.Router();

// controller
import groupController from "../controllers/groupController.js";

// router.post("/", userController.authenticateToken, groupController.create);
router.get("/", groupController.all);
router.get("/messages/:groupId", groupController.messages);

export default router;
