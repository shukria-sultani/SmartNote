export default function NoteCard({note, onDelete}) {

  return (
    <>
          <div className="main-container">
            <div className="note-card">
              <h4>Subject: {note.subject}</h4>
              <h4>Title: {note.title}</h4>
              <p >{note.content.substring(0, 350) + "..."}</p>
            </div>
            <div className="actions">
              <button>Read</button>
              <button>Delete</button>
            </div>
          </div>
   
    </>
  );
}
