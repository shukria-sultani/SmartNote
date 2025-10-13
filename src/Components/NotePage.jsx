import AddNote from "./AddNote";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function NotePage(){
  const [isModalOpen, setModelOpen] = useState(false)
     return(
       <>
         <Header></Header>
          <div className="add-note"><button onClick={()=> {setModelOpen(true)}}>Add Note</button></div>
           {isModalOpen && <div className="noteFom-modal"><AddNote closeModal={()=>{setModelOpen(false)}}></AddNote></div>}
         </>
     )
}