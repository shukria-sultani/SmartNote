import AppError from "../utils/errorHandler.js";
import Notes from "../models/notes.js"

export const createNote = async(payload) =>{
     const {userId, title, subject, note_text} = payload;
     if(!userId || !title || !subject || !note_text){
        throw new AppError(400, "UserId, title, subject and note's text are required!")
     }
    const note = await Notes.create(
        {
         ...payload
        }
      )
      return note; 
}