import AddNote from "./AddNote";
import Header from "./Header";
import Search from "./Search";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
import Filter from "./Filter";
import NoteCard from "./NoteCard";
export default function NotePage() {
  const [isModalOpen, setModelOpen] = useState(false);
  const { value: notes, setValue: setNotes } = useLocalStorage("notesData", []);
  const storeNotes = (newNote) => {
    setNotes((prevNotes) => {
      const notesArray = Array.isArray(prevNotes) ? prevNotes : [];
      return [newNote, ...notesArray];
    });
    console.log(notes)
  };

  return (
    <>
      <Header></Header>
      <div className="add-note">
        <button
          onClick={() => {
            setModelOpen(true);
          }}
        >
          Add Note
        </button>
      </div>
      {isModalOpen && (
        <div className="noteFom-modal">
          <AddNote
            closeModal={() => {
              setModelOpen(false);
            }}
            onSubmit={storeNotes}
          ></AddNote>
        </div>
      )}
      <div className="search-filter">
        <Search></Search>
        <Filter></Filter>
      </div>
        <div className="notes-card-container">
      {Array.isArray(notes) && notes.map((note, index)=>{
           
           const uniqueID = note.id ? note.id : `${note.title}-${index}`
            return (<NoteCard key={uniqueID} note={note}></NoteCard>)
      })
    }
       </div>
    </>
  )
}
