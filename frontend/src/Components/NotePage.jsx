
import AddNote from "./AddNote";
import Filter from "./Filter";
import Search from "./Search";
import NoNote from "./NoNote";
import NoteCard from "./NoteCard";
import DeleteModal from "./DeleteModal";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";

import { useTranslation } from "../hooks/useTranslationContext";

export default function NotePage() {
  const [isModalOpen, setModelOpen] = useState(false);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);

  const {
    value: notes,
    setValue: setNotes,
    removeNoteById,
  } = useLocalStorage("notesData", []);

  // Store the new note to local storage
  const storeNotes = (newNote) => {
    setNotes((prevNotes) => {
      const notesArray = Array.isArray(prevNotes) ? prevNotes : [];
      return [newNote, ...notesArray];
    });

    setModelOpen(false);

    toast.success("Note successfully Added!", {
      duration: 3000,
    });
  };

  useEffect(() => {
    const allSubjects = Array.isArray(notes)
      ? notes
          .filter((note) => note && note.subject)
          .map((note) => note.subject)
      : [];

    const uniqueSet = new Set(allSubjects);
    setUniqueSubjects(Array.from(uniqueSet));
  }, [notes]);

  // Handle filter
  const [filterTerm, setFilterTerm] = useState("");

  const filteredNotes =
    filterTerm === ""
      ? notes
      : notes.filter(
          (note) => note && note.subject === filterTerm
        );

  // Handle search
  const [searchTerm, setSearchTerm] = useState("");

  const searchResult =
    searchTerm === ""
      ? filteredNotes
      : filteredNotes.filter(
          (note) =>
            note &&
            note.content
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );

  // Handle delete confirmation
  const [noteToDeleteId, setNoteToDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setNoteToDeleteId(id);
  };

  // Perform actual deletion after confirmation
  const confirmDeletion = () => {
    if (noteToDeleteId) {
      removeNoteById(noteToDeleteId);

      toast.success("Note successfully deleted!", {
        duration: 3000,
      });
    }

    setNoteToDeleteId(null);
  };

  // Cancel deletion
  const cancelDeletion = () => {
    setNoteToDeleteId(null);
  };

  const { t } = useTranslation();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Add Note Button */}
      {Array.isArray(notes) && notes.length > 0 ? (
        <div className="flex justify-end px-5 pt-5">
          <button
            onClick={() => {
              setModelOpen(true);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 hover:bg-secondary hover:text-gray-900 hover:shadow-lg active:scale-95"
            aria-label="Add note"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
      ) : null}

      {/* Add Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black/40 p-4">
          <AddNote
            closeModel={() => {
              setModelOpen(false);
            }}
            onSubmit={storeNotes}
            buttonText={t("add_note")}
            formTitle={t("add_title")}
          />
        </div>
      )}

      {/* Search and Filter */}
      {Array.isArray(notes) && notes.length > 0 ? (
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Search setSearch={setSearchTerm} />

          <Filter
            subjects={uniqueSubjects}
            setFilter={setFilterTerm}
          />
        </div>
      ) : null}

      {/* Notes */}
      {Array.isArray(searchResult) && searchResult.length === 0 ? (
        <NoNote
          openForm={() => {
            setModelOpen(true);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 px-5 pb-5 lg:grid-cols-3">
          {Array.isArray(searchResult) &&
            searchResult.map((note, index) => {
              if (!note || typeof note !== "object") return null;

              const uniqueID = note.id
                ? note.id
                : `${note.title}-${index}`;

              return (
                <NoteCard
                  key={uniqueID}
                  note={note}
                  onDelete={handleDeleteClick}
                />
              );
            })}
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        noteId={noteToDeleteId}
        onConfirm={confirmDeletion}
        onCancel={cancelDeletion}
      />
    </>
  );
}

