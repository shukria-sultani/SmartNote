import AppError from "../utils/errorHandler.js";
import Notes from "../models/notes.js"


export const createNote = async (payload) => {
   const { userId, title, subject, note_text } = payload;
   if (!userId || !title || !subject || !note_text) {
      throw new AppError(400, "UserId, title, subject and note's text are required!")
   }
   const note = await Notes.create(
      {
         ...payload
      }
   )
   return note;
}
export const getNotes = async (userId) => {
   if (!userId) {
      throw new AppError(400, "User id is required!")
   }
   const convertUserIdToNumber = Number(userId);
   const notes = await Notes.findAll(
      {
         where: {
            userId: convertUserIdToNumber,
            isDeleted: false
         }
      }
   )
   return notes;
}

export const editNote = async (payload) => {
   const { noteId } = payload
   if (!noteId) {
      throw new AppError(400, "Note id is required!")
   }
   const { userId, title, subject, note_text } = payload
   if (!userId || !title || !subject || !note_text) {
      throw new AppError(400, "UserId, title, subject and note's text are required!")
   }
   const convertNoteIdToNumber = Number(noteId)
   const note = await Notes.findOne(
      {
         where: {
            id: convertNoteIdToNumber,
            isDeleted: false
         }
      }
   )
   if (!note) {
      throw new AppError(404, "Note not found!")
   }
   const updatedNote = await note.update(
      {
         ...payload
      }
   )
   return updatedNote
}

export const softDeleteNote = async (noteId) => {
   if (!noteId) {
      throw new AppError(400, "Note id is required!")
   }
   const note = await Notes.findOne(
      {
         where: {
            id: noteId,
            isDeleted: false
         }
      }
   )
   if(!note){
      throw new AppError(404, "Note not found!")
   }
   await note.update(
      {
         isDeleted: true
      }
   )
}