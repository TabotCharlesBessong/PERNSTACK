import express from 'express';
import protectedRoute from '../middleware/protectedRoute';
import { sendMessage } from '../controller/message.controller';
const router = express.Router()

router.post("/send/:id",protectedRoute,sendMessage)

export default router