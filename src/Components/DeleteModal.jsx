

export default function DeleteModal ({onConfirm, onCancel, noteId}){
 if(noteId === null) return null
     return(
   <div className="main-delete-con">
        <div className="delete-container">
            <h3>Are you sure that you want to delete this note?</h3>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
        </div>
     )
}