import { LuNotebookText } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import { useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
export default function AddNote({ onSubmit, initialNoteData = null, formTitle, closeModel, buttonText}) {
  const [noteData, setNoteData] = useState(
    initialNoteData || {
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

  // Handle react quill 
  const handleContent = (contentValue)=>{
     setNoteData((prevNoteData)=>({
        ...prevNoteData,
        content: contentValue
     }))
  }
  const handleSubmit = () => {
    const newNote = {
      id: initialNoteData ? initialNoteData.id : Date.now(),
      ...noteData,
    };
    onSubmit(newNote);
    
   if(!initialNoteData){
setNoteData({
      title: "",
      subject: "",
      content: "",
    });
   } 
  };

 // Handle main vertical scroll
      useEffect(() => {
            document.body.classList.add('no-scroll');
                    return () => {
                document.body.classList.remove('no-scroll');
            };
        }, []);
  
  return (
    <>
      <div className="noteForm-container">
        <IoMdClose className="closeIcon" onClick={closeModel}></IoMdClose>
        <h2>
          <LuNotebookText
            style={{ fontSize: "1.4rem", color: "rgb(255, 158, 1)" }}
          ></LuNotebookText>{" "}
         {formTitle}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
          <ReactQuill
            theme="snow"

            value={noteData.content}
            onChange={handleContent}
            spellCheck
          />
          <button>{buttonText}</button>
        </form>
      </div>
    </>
  );
}
