
import { createNote, editNote, getNotes, hardDeleteNote, softDeleteNote } from "../services/notesServices.js"

export const createNewNote = async (req, res) => {
    try {
        const { title, subject, note_text } = req.body;
        const userId = req.userId;
        const payload = { userId, title, subject, note_text };
        const note = await createNote(payload);
        res.status(201).json(
            {
                success: true,
                note
            }
        )
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: error.message
        })
    }


}

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await getNotes(userId)
        res.status(200).json({ success: true, notes })
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: error.message
        })
    }
}
export const editANote = async (req, res) => {
    try {
        const userId = req.userId
        const noteId = req.params.id
        const { title, subject, note_text } = req.body
        const payload = { noteId, userId, title, subject, note_text }
        const updatedNote = await editNote(payload);
        res.status(200).json(
            {
                success: true,
                updatedNote
            }
        )
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: error.message
        })
    }
}

export const softDeleteANote = async (req, res) => {
    try {
        const noteId = req.params.id
        const deleteNote = await softDeleteNote(noteId)
        res.status(200).json(
            {
                success: true,
                message: "Note moved to trash successfully!"
            }
        )
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: error.message
        })
    }
}
export const hardDeleteANote = async (req, res) => {
    try {
        const noteId = req.params.id
        const deleteNote = await hardDeleteNote(noteId)
        res.status(200).json(
            {
                success: true,
                message: "Note deleted successfully!"
            }
        )
    } catch (error) {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: error.message
        })
    }
}