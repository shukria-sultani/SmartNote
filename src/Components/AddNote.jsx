import { LuNotebookText } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
export default function AddNote({ closeModal, onSubmit }) {

  const [noteData, setNoteData] = useState({
    title: "",
    subject: "",
    content: "",
  });
  const handleChange = (e) => {
      const { id, value } = e.target;
      setNoteData((prevNoteData) => ({
        ...prevNoteData,
        [id]: value, 
      }));
 
    };
  const handleSubmit = ()=>{
    const newNote = {
      id: Date.now(),
      ...noteData
    }
    onSubmit(newNote)
        setNoteData({
    title: "",
    subject: "",
    content: "",
  })
  
  }
  return (
    <>
      <div className="noteForm-container">
        <IoMdClose className="closeIcon" onClick={closeModal}></IoMdClose>
        <h2>
          <LuNotebookText
            style={{ fontSize: "1.4rem", color: "rgb(255, 158, 1)" }}
          ></LuNotebookText>{" "}
          Add a new Note
        </h2>
        <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
      
  }}>
          <label htmlFor="title">Enter the title:</label>
          <input
            type="text"
            id="title"
            required
            spellCheck
            value={noteData.title}
            onChange={handleChange}
          />
          <label htmlFor="subject">Enter the subject:</label>
          <input
            type="text"
            id="subject"
            required
            spellCheck
               value={noteData.subject}
            onChange={handleChange}
         
          />
          <label htmlFor="content">Enter the note content:</label>
          <textarea
            type="text"
            id="content"
            required
                        value={noteData.content}
            onChange={handleChange}
            spellCheck

          />
          <button>Add</button>
        </form>
      </div>
    </>
  );
}
