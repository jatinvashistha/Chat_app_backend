import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { allMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.route('/').post(isAuthenticated, sendMessage)

router.route('/:chatId').get(isAuthenticated,allMessages)
// messageControllers.js

export default router;
