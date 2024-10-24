import express from "express";
const router = express.Router();

// controller
import userController from "../controllers/userController.js";

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/user", userController.authenticateToken, userController.user);

export default router;
