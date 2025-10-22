import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowsToEye } from "react-icons/fa6";
export default function NoteReadMode() {
  const { value: notes } = useLocalStorage("notesData");
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

  const navigate = useNavigate();
  return (
    <>
    <FaArrowLeft className="arrow" onClick={()=>{navigate(-1)}}></FaArrowLeft>
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
        <p>{note.content}</p>
      </div>
    </>
  );
}
