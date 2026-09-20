import express from "express";
const router = express.Router();
import {createNewUser, login, refreshToken} from "../controllers/authController.js";
router.post("/signup", createNewUser);
router.post("/login",  login)
router.post("/refreshToken", refreshToken)

export default router
