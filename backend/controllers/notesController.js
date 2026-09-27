
import { createNote } from "../services/notesServices.js"

export const createNewNote = async (req, res) => {
    const { title, subject, note_text } = req.body;
    const userId = req.userId;
    try {
        const payload = { userId, title, subject, note_text };
        console.log(payload)
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