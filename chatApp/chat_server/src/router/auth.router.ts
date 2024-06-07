import express from "express";
import { getAllUsers, getMe, login, logout, signup } from "../controller/auth.controller";
import protectedRoute from "../middleware/protectedRoute";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectedRoute,getMe);
router.get("/all", protectedRoute,getAllUsers);

export default router;
