import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowsToEye } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import AddNote from "./AddNote";
export default function NoteReadMode() {
  const { value: notes, setValue: setNotes } = useLocalStorage("notesData");
  const { noteId } = useParams();
  const note = notes.find((n) => n.id === Number(noteId));
  if (!note) {
    return (
      <div className="note-content">
        <p>Note not found or still loading...</p>
      </div>
    );
  }
  
  const [noteAreaColor, setNoteAreaColor] = useState("White");
  const [className, setClassName] = useState("");
  const handleColorChange = (color) => {
    setNoteAreaColor(color);
    console.log(color);
  };
  useEffect(() => {
    if (noteAreaColor === "White") {
      setClassName("white-area");
    }
    if (noteAreaColor === "Sepia") {
      setClassName("sepia-area");
    }
    if (noteAreaColor === "Light Green") setClassName("lightGreen-area");
  }, [noteAreaColor]);


  //Handle update

   const [openModel, setModelOpen] = useState(false)
 const handleUpdate = (updatedNote)=>{
    setNotes((prevNotes) => {
            return prevNotes.map((n) => 
                n.id === updatedNote.id ? updatedNote : n
            );
        });
        setModelOpen(false)
          toast.success("Note successfully Updated!", {
        duration: 3000,
      });
 }
  

  const navigate = useNavigate();
  return (
    <>
          <Toaster position="top-right" reverseOrder={false} />

    <FaArrowLeft className="arrow" onClick={()=>{navigate(-1)}}></FaArrowLeft>
    <div className="action-buttons">
      <button  onClick={() => {
            setModelOpen(true);
          }}>Edit</button>
    </div>
   
      {openModel && (
              <div className="noteFom-modal">
                <AddNote
                initialNoteData={note}
                  closeModel={() => {
                    setModelOpen(false);
                  }}
                  formTitle={"Edit the Note"}
                  onSubmit={handleUpdate}
                  buttonText={"Update Note"}
                ></AddNote>
              </div>
            )}
  
      <div className={`note-content ${className}`}>
        <div className="note-color">
          <select
            name=""
            id=""
            onChange={(e) => {
              handleColorChange(e.target.value);
            }}
          >
            <option value="White">White</option>
            <option value="Sepia">Sepia</option>
            <option value="Light Green">Light Green</option>
          </select>
        </div>
        <h3>Subject: {note.subject}</h3>
        <h4>Title: {note.title}</h4>
      <p dangerouslySetInnerHTML={{ __html: note.content}}></p>
      </div>
    </>
  );
}
