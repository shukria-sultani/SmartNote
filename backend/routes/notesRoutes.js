import express from "express"
const router = express.Router();
import { createNewNote, getAllNotes, editANote, softDeleteANote } from "../controllers/notesController.js";
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
router.put(
    "/edit-note/:id",
    authenticateUser,
    editANote
)
router.patch(
    "/soft-delete/:id",
    authenticateUser,
    softDeleteANote
)
export default router;