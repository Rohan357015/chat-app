import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id/messages", protectRoute, getMessages);
router.post("/:id/messages", protectRoute, sendMessage);

export default router;