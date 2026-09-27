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
export const getNotes = async(userId)=>{
   if(!userId){
      throw new AppError(400, "User id is required!")
   }
   const convertUserIdToNumber = Number(userId);
   const notes = await Notes.findAll(
    {
      where: {
         userId: convertUserIdToNumber,
         isDeleted: false
      }}
   )
   return notes;
}