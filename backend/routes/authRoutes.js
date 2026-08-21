import express from "express";
const router = express.Router();
import {createNewUser} from "../controllers/authController.js";
router.post("/signup", createNewUser);



export default router
