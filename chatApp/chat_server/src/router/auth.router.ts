import express from "express";
import { getMe, login, logout, signup } from "../controller/auth.controller";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe);

export default router;
