import express from "express"
const router = express.Router();
import { createNewNote, getAllNotes, editANote } from "../controllers/notesController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { editNote } from "../services/notesServices.js";
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
router.put(
    "/edit-note/:id",
    authenticateUser,
    editANote
)
export default router;