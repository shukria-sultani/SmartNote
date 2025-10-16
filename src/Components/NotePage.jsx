import AddNote from "./AddNote";
import Header from "./Header";
import {useLocalStorage} from "../hooks/useLocalStorage"
import { useState } from "react";
export default function NotePage(){
  const [isModalOpen, setModelOpen] = useState(false)
    const {value: notes, setValue : setNotes } = useLocalStorage("notesData", []); 
    const storeNotes = (newNote) => {
        setNotes((prevNotes) => {
            const notesArray = Array.isArray(prevNotes) ? prevNotes : [];
            return [newNote, ...notesArray]; 
        });
    };
     return(
       <>
         <Header></Header>
          <div className="add-note"><button onClick={()=> {setModelOpen(true)}}>Add Note</button></div>
           {isModalOpen && <div className="noteFom-modal"><AddNote closeModal={()=>{setModelOpen(false)}}  onSubmit={storeNotes}></AddNote></div>}
         </>
     )
}