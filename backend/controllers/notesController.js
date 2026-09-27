
import { createNote, getNotes } from "../services/notesServices.js"

export const createNewNote = async (req, res) => {
try {
    const { title, subject, note_text } = req.body;
    const userId = req.userId;
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

export const getAllNotes = async(req, res)=>{
   try{
    const userId = req.userId;
    const notes = await getNotes(userId)
    res.status(200).json({success: true, notes})
    }catch(error){
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: error.message
     })
    }
}