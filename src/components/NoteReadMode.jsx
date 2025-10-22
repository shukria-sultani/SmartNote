import { useParams } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"

export default function NoteReadMode (){
    const {value: notes} = useLocalStorage("notesData")
    const {noteId} = useParams()
    const note = notes.find(n => n.id === Number(noteId))
    if(!note){
        return (
            <div className="note-content">
                <p>Note not found or still loading...</p>
            </div>
        );
    }
      return(
        <>
         
         <div className="note-content">
            <h3>Subject: {note.subject}</h3>
            <h4>Title: {note.title}</h4>
            <p>{note.content}</p>

         </div>
        
        </>
      )
}