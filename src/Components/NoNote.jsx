import { FaPlus } from "react-icons/fa";
import noNoteImg from "../assets/images/note.gif"
export default function NoNote({openForm}){
       return (
        <>
         <div className="no-note">
            <img src={noNoteImg} alt="" />

            <h2>No Notes Here Yet!</h2> 
              <p>Time to capture your thoughts.</p>

              <button onClick={openForm}><FaPlus></FaPlus> Add Note</button>

         </div>
        
        </>
       )
}