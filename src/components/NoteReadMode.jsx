import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import AddNote from "./AddNote";
import Quiz from "./Quiz";

export default function NoteReadMode() {
  const { value: notes, setValue: setNotes } = useLocalStorage("notesData");
  const { noteId } = useParams();
  const note = notes.find((n) => n.id === Number(noteId));

  // State Management
  const [noteAreaColor, setNoteAreaColor] = useState("White");
  const [className, setClassName] = useState("");
  const [openModel, setModelOpen] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);

  // State to store the fetched or cached quiz questions
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // Handle Note Not Found
  if (!note) {
    return (
      <div className="note-content">
        <p>Note not found or still loading...</p>
      </div>
    );
  }

  // Note content area color logic
  const navigate = useNavigate();

  const handleColorChange = (color) => {
    setNoteAreaColor(color);
  };

  useEffect(() => {
    if (noteAreaColor === "White") {
      setClassName("white-area");
    } else if (noteAreaColor === "Sepia") {
      setClassName("sepia-area");
    } else if (noteAreaColor === "Light Green") {
      setClassName("lightGreen-area");
    }
  }, [noteAreaColor]);

  const handleUpdate = (updatedNote) => {
    setNotes((prevNotes) => {
      return prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    });
    setModelOpen(false);
    toast.success("Note successfully Updated!", {
      duration: 3000,
    });
  };

  // Quiz logic with caching implemented directly in the note object
  const getQuizData = async () => {
    setQuizLoading(true);
    setQuizQuestions(null);

    if (note.quiz) {
      try {
        // If quiz property exists on the note, use it instantly
        setQuizQuestions(note.quiz);
        setOpenQuiz(true);
        setQuizLoading(false);
        toast.success("Quiz loaded from note cache!", { duration: 1500 });
        return; // Exit the function to skip API call
      } catch (error) {
        console.error(
          "Error loading cached quiz from note structure. Re-fetching.",
          error
        );
      }
    }

    // 2. Fetch questions from API
    const quizPrompt = `Generate a JSON array containing 5 multiple-choice quiz questions about the topic: **${note.title}**. Each question object must have:
            1. A "question" string.
            2. A "options" object where keys are "a", "b", "c", "d" and values are option strings.
            3. A "correctAnswer" string containing only the key of the correct option (e.g., "b").
            Return ONLY the raw JSON array. DO NOT include any introductory or explanatory text.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.7,
            max_tokens: 1000,
            messages: [{ role: "system", content: quizPrompt }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
      }

      const data = await response.json();
      const rawContent = data.choices[0].message.content.trim();

      // Strip surrounding markdown code fences
      const jsonString = rawContent.replace(/^```json\s*|```$/g, "").trim();

      if (!jsonString) {
        throw new Error(
          "AI returned an empty or unparsable content block after cleanup."
        );
      }

      const fetchedQuestions = JSON.parse(jsonString);

      // 3. SAVE TO NOTE STRUCTURE AND OPEN QUIZ 📥

      // Update the state of the notes array via the hook setter, adding the 'quiz' property to the current note
      setNotes((prevNotes) => {
        return prevNotes.map((n) =>
          n.id === note.id ? { ...n, quiz: fetchedQuestions } : n
        );
      });

      setQuizQuestions(fetchedQuestions);
      setOpenQuiz(true);
    } catch (error) {
      console.error("Quiz Data Fetch Error:", error);
      toast.error(`Could not fetch quiz data. Error: ${error.message}`, {
        duration: 5000,
      });
    } finally {
      setQuizLoading(false);
    }
  };

  const handleTakeQuizClick = () => {
    if (!quizLoading) {
      getQuizData();
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <FaArrowLeft
        className="arrow"
        onClick={() => {
          navigate(-1);
        }}
      ></FaArrowLeft>
      <div className="action-buttons">
        <button
          onClick={() => {
            setModelOpen(true);
          }}
        >
          Edit Note
        </button>

        <button onClick={handleTakeQuizClick} disabled={quizLoading}>
          {quizLoading ? "Loading Quiz..." : "Take Quiz"}
        </button>
        <button>AI Summary</button>
      </div>
      {/* Edit form*/}
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
      {/*Quiz model*/}
      {openQuiz && quizQuestions && (
        <div className="quiz-modal">
          <Quiz
            questions={quizQuestions}
            closeQuiz={() => {
              setOpenQuiz(false);
            }}
          />
        </div>
      )}

      {/* Note content */}
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
        <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
      </div>
    </>
  );
}
