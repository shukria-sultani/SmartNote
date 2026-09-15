import express from "express";
const router = express.Router();
import {createNewUser, login, rotateRefreshToken} from "../controllers/authController.js";
router.post("/signup", createNewUser);
router.post("/login",  login)
router.post("/refreshToken", rotateRefreshToken)

export default router
