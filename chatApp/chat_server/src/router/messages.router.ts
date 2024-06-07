import express from "express";
import protectedRoute from "../middleware/protectedRoute";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controller/message.controller";
const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);
router.get("/conversations", protectedRoute, getUsersForSidebar);

export default router;
