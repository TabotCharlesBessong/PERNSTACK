import express from "express";
import protectedRoute from "../middleware/protectedRoute";
import { getMessages, sendMessage } from "../controller/message.controller";
const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;
