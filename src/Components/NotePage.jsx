import AddNote from "./AddNote";
import Header from "./Header";
import Search from "./Search";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import NoteCard from "./NoteCard";
import DeleteModal from "./DeleteModal";

import toast, { Toaster } from 'react-hot-toast';
export default function NotePage() {
  const [isModalOpen, setModelOpen] = useState(false);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const {
    value: notes,
    setValue: setNotes,
    removeNoteById,
  } = useLocalStorage("notesData", []);
  const storeNotes = (newNote) => {
    setNotes((prevNotes) => {
      const notesArray = Array.isArray(prevNotes) ? prevNotes : [];
      return [newNote, ...notesArray];
    });
    console.log(notes);
  };
  useEffect(() => {
    const allSubjects = Array.isArray(notes)
      ? notes.filter((note) => note && note.subject).map((note) => note.subject)
      : [];
    const uniqueSet = new Set(allSubjects);
    setUniqueSubjects(Array.from(uniqueSet));
  }, [notes]);

  // Handle filter
  const [filterTerm, setFilterTerm] = useState("");
  const filteredNotes =
    filterTerm === ""
      ? notes
      : notes.filter((note) => note && note.subject === filterTerm);

  // Handle search
  const [searchTerm, setSearchTerm] = useState("");
  const searchResult =
    searchTerm === ""
      ? filteredNotes
      : filteredNotes.filter(
          (note) =>
            note &&
            note.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
  // Handle delete confimation
  const [noteToDeleteId, setNoteToDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setNoteToDeleteId(id);
  };

  // Function to perform the actual deletion after confirmation
  const confirmDeletion = () => {
    if (noteToDeleteId) {
      removeNoteById(noteToDeleteId);
      // Use your toast here for success!
      toast.success("Note successfully deleted!", {
            duration: 3000, 
        });

    }
    setNoteToDeleteId(null);
  };

  // Function to cancel the deletion
  const cancelDeletion = () => {
    setNoteToDeleteId(null);
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
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
        <Search setSearch={setSearchTerm}></Search>
        <Filter subjects={uniqueSubjects} setFilter={setFilterTerm}></Filter>
      </div>
      <div className="notes-card-container">
        {Array.isArray(searchResult) &&
          searchResult.map((note, index) => {
            if (!note || typeof note !== "object") return null;
            const uniqueID = note.id ? note.id : `${note.title}-${index}`;
            return (
              <NoteCard
                key={uniqueID}
                note={note}
                onDelete={handleDeleteClick}
              ></NoteCard>
            );
          })}
      </div>
      <DeleteModal
        noteId={noteToDeleteId}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
      ></DeleteModal>
    </>
  );
}
