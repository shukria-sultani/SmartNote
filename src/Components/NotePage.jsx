import AddNote from "./AddNote";
import Search from "./Search"
import Filter from "./Filter";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import DeleteModal from "./DeleteModal";
import { FaPlus } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
export default function NotePage() {
  const [isModalOpen, setModelOpen] = useState(false);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const {
    value: notes,
    setValue: setNotes,
    removeNoteById,
  } = useLocalStorage("notesData", []);
  // Store the new note to local stroage
  const storeNotes = (newNote) => {
    setNotes((prevNotes) => {
      const notesArray = Array.isArray(prevNotes) ? prevNotes : [];
      return [newNote, ...notesArray];
    });

     setModelOpen(false)
          toast.success("Note successfully Added!", {
        duration: 3000,
      });
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
          <FaPlus></FaPlus>
        </button>
      </div>

      {isModalOpen && (
        <div className="noteFom-modal">
          <AddNote
            closeModel={() => {
              setModelOpen(false);
            }}
            onSubmit={storeNotes}
            buttonText={"Add Note"}
           formTitle={"Add a New Note"}></AddNote>
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
