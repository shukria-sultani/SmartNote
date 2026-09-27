import express from "express"
const router = express.Router();
import { createNewNote } from "../controllers/notesController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
 router.post(
    "/create-note",
    authenticateUser,
    createNewNote

)

export default router;