import express from "express"
const router = express.Router();
import { createNewNote, getAllNotes } from "../controllers/notesController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
 router.post(
    "/create-note",
    authenticateUser,
    createNewNote

)
router.get(
    "/get-notes",
    authenticateUser,
    getAllNotes
)

export default router;