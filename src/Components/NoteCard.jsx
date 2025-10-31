import {Link, useNavigate, useParams} from "react-router-dom"
export default function NoteCard({note, onDelete}) {
  const navigate = useNavigate()
   const readNote = (noteId)=>{
      navigate(`/read/${noteId}`)
   }

  return (
    <>
          <div className="main-container">
                <div className="actions">
         
                  <button onClick={()=>{readNote(note.id)}}>Read</button>
                  <button onClick={() => onDelete(note.id)}>Delete</button>
                
                </div>
            <div className="note-card">
              <h4>Subject: {note.subject}</h4>
              <h4>Title: {note.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: note.content.substring(0, 800) + "..." }}></p>
            </div>
          </div>
   
    </>
  );
}
