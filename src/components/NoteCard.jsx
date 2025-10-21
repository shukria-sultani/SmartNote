export default function NoteCard({note, onDelete}) {

  return (
    <>
          <div className="main-container">
                <div className="actions">
         
                  <button>Read</button>
                  <button onClick={() => onDelete(note.id)}>Delete</button>
                
                </div>
            <div className="note-card">
              <h4>Subject: {note.subject}</h4>
              <h4>Title: {note.title}</h4>
              <p >{note.content.substring(0, 300) + "..."}</p>
            </div>
          </div>
   
    </>
  );
}
