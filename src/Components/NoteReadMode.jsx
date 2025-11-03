import { useParams, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Summary from "./Summary";
import AddNote from "./AddNote";
import { usePDF } from "react-to-pdf";
import { MdSummarize } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { Edit3 } from "lucide-react";
import Quiz from "./Quiz";

export default function NoteReadMode() {
  const { value: notes, setValue: setNotes } = useLocalStorage("notesData");
  const { noteId } = useParams();
  const note = notes.find((n) => n.id === Number(noteId));

  const { toPDF, targetRef } = usePDF({
    filename: `${note?.title || "Note"}_Export.pdf`,
    resolution: 5,
    page: { margin: 25.4 },
  });

  const [noteAreaColor, setNoteAreaColor] = useState("#fff");
  const [openModel, setModelOpen] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [openSummary, setOpenSummary] = useState(false); // State to store the fetched or cached quiz questions

  const [quizQuestions, setQuizQuestions] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false); //State to store the fetched or cached summary

  const [noteSummary, setNoteSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false); // Handle Note Not Found

  if (!note) {
    return (
      <div className="note-content">
        <p>Note not found or still loading...</p>
      </div>
    );
  } // Note content area color logic

  const navigate = useNavigate();

  const handleUpdate = (updatedNote) => {
    setNotes((prevNotes) => {
      return prevNotes.map((n) => (n.id === updatedNote.id ? updatedNote : n));
    });
    setModelOpen(false);
    toast.success("Note successfully Updated!", {
      duration: 3000,
    });
  };

  const getQuizData = async () => {
    setQuizLoading(true);
    setQuizQuestions(null);

    if (note.quiz) {
      try {
        // If quiz property exists on the note, use it instantly
        setQuizQuestions(note.quiz);
        setOpenQuiz(true);
        setQuizLoading(false);
        return; // Exit the function to skip API call
      } catch (error) {
        console.error(
          "Error loading cached quiz from note structure. Re-fetching.",
          error
        );
      }
    } // 2. Fetch questions from API

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

      const jsonString = rawContent.replace(/^```json\s*|```$/g, "").trim();

      if (!jsonString) {
        throw new Error(
          "AI returned an empty or unparsable content block after cleanup."
        );
      }

      const fetchedQuestions = JSON.parse(jsonString);

      //Add the quiz questions to the notesData array
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
  }; // Summary logic

  const handleSummary = async () => {
    setSummaryLoading(true);
    setNoteSummary(null);
    try {
      if (note.summary) {
        setNoteSummary(note.summary);
        setSummaryLoading(false);
        setOpenSummary(true);
        return;
      }
    } catch (error) {
      console.log("Failed to get data from catch", error);
    }
    const summaryPrompt = `Give an accurate, concise, well organized summary based on this content: ${note.content}`;
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
            messages: [{ role: "system", content: summaryPrompt }],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || response.statusText);
      }
      const data = await response.json();
      const fetchedSummary = data.choices[0].message.content.trim();

      setNotes((prevNotes) => {
        return prevNotes.map((n) =>
          n.id === note.id ? { ...n, summary: fetchedSummary } : n
        );
      });

      setNoteSummary(fetchedSummary);
      setOpenSummary(true);
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch summary", error);
    } finally {
      setSummaryLoading(false);
    }
  };
  const handleSummaryClick = () => {
    if (!summaryLoading) {
      handleSummary();
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
      {/* Action buttons */}
      <div className="action-buttons">
        <button
          onClick={() => {
            setModelOpen(true);
          }}
        >
          <Edit3 style={{ width: "18px", height: "auto" }}></Edit3> Edit Note
        </button>

        <button onClick={handleTakeQuizClick} disabled={quizLoading}>
          <FaQuestionCircle></FaQuestionCircle>{" "}
          {quizLoading ? " Loading Quiz..." : " Take Quiz"}
        </button>
        <button onClick={handleSummaryClick} disabled={summaryLoading}>
          <MdSummarize></MdSummarize>
          {summaryLoading ? " Loading Summary..." : " AI Summary"}
        </button>
        <button
          onClick={() => toPDF()}
          title="Download Note as PDF Image (Not Selectable)"
        >
          <FaDownload /> Download Note
        </button>
      </div>
      {/* Modals (Edit, Quiz, Summary) */}
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
       
      {openSummary && (
        <Summary
          closeSummary={() => {
            setOpenSummary(false);
          }}
          summary={noteSummary}
          noteTitle={note.title}
        ></Summary>
      )}
      <div className="note-content" style={{ backgroundColor: noteAreaColor }}>
        <div className="note-color-controls">
          <label htmlFor="note-bg-color">Choose background color </label>
          <div className="color-picker-wrapper">
            
            <input
              type="color"
              id="note-bg-color"
              className="color-picker-swatch"
              value={noteAreaColor}
              onChange={(e) => setNoteAreaColor(e.target.value)}
            />
          </div>
        </div>

        <div ref={targetRef} className="note-printable-area">
          <h3>Subject: {note.subject}</h3>
          <h4>Title: {note.title}</h4>
          <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
        </div>
      </div>
    </>
  );
}
