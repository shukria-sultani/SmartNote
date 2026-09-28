import express from "express"
const router = express.Router();
import { createNewNote, getAllNotes, editANote, softDeleteANote, hardDeleteANote } from "../controllers/notesController.js";
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
router.delete(
    "/hard-delete/:id",
    authenticateUser,
    hardDeleteANote
)
export default router;