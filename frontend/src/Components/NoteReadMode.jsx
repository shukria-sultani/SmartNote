
import { useParams, useNavigate } from "react-router-dom";

import { useLocalStorage } from "../hooks/useLocalStorage";

import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaArrowRight,
  FaDownload,
  FaQuestionCircle,
} from "react-icons/fa";

import toast, { Toaster } from "react-hot-toast";

import Summary from "./Summary";
import AddNote from "./AddNote";
import Quiz from "./Quiz";

import { usePDF } from "react-to-pdf";

import { MdSummarize } from "react-icons/md";
import { LuPen } from "react-icons/lu";

import { useTranslation } from "../hooks/useTranslationContext";

export default function NoteReadMode() {
  const { value: notes, setValue: setNotes } =
    useLocalStorage("notesData");

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
  const [openSummary, setOpenSummary] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  const [noteSummary, setNoteSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const [direction, setDirection] = useState("ltr");

  if (!note) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-5">
        <p className="rounded-lg border border-secondary/30 bg-white px-6 py-4 text-sm text-gray-500 shadow-sm">
          Note not found or still loading...
        </p>
      </div>
    );
  }

  const navigate = useNavigate();

  const handleUpdate = (updatedNote) => {
    setNotes((prevNotes) => {
      return prevNotes.map((n) =>
        n.id === updatedNote.id ? updatedNote : n
      );
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
        setQuizQuestions(note.quiz);
        setOpenQuiz(true);
        setQuizLoading(false);
        return;
      } catch (error) {
        console.error(
          "Error loading cached quiz from note structure. Re-fetching.",
          error
        );
      }
    }

    const quizPrompt = `Generate a JSON array containing 5 multiple-choice quiz questions about the topic: **${note.title}**. Each question object must have:

1. A "question" string.

2. A "options" object where keys are "a", "b", "c", "d" and values are option strings.

3. A "correctAnswer" string containing only the key of the correct option (e.g., "b").

Return ONLY the raw JSON array. DO NOT include any introductory or explanatory text and consider the topic's language.`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_OPENAI_API_KEY
            }`,
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
        throw new Error(
          errorData.error?.message || response.statusText
        );
      }

      const data = await response.json();
      const rawContent = data.choices[0].message.content.trim();

      const jsonString = rawContent
        .replace(/^```json\s*|```$/g, "")
        .trim();

      if (!jsonString) {
        throw new Error(
          "AI returned an empty or unparsable content block after cleanup."
        );
      }

      const fetchedQuestions = JSON.parse(jsonString);

      setNotes((prevNotes) => {
        return prevNotes.map((n) =>
          n.id === note.id
            ? { ...n, quiz: fetchedQuestions }
            : n
        );
      });

      setQuizQuestions(fetchedQuestions);
      setOpenQuiz(true);
    } catch (error) {
      console.error("Quiz Data Fetch Error:", error);

      toast.error(
        `Could not fetch quiz data. Error: ${error.message}`,
        {
          duration: 5000,
        }
      );
    } finally {
      setQuizLoading(false);
    }
  };

  const handleTakeQuizClick = () => {
    if (!quizLoading) {
      getQuizData();
    }
  };

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

    const summaryPrompt = `Give an accurate, concise, well organized summary based on this content: ${note.content} and based on the content's language`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_OPENAI_API_KEY
            }`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            temperature: 0.7,
            max_tokens: 1000,
            messages: [
              {
                role: "system",
                content: summaryPrompt,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || response.statusText
        );
      }

      const data = await response.json();
      const fetchedSummary =
        data.choices[0].message.content.trim();

      setNotes((prevNotes) => {
        return prevNotes.map((n) =>
          n.id === note.id
            ? { ...n, summary: fetchedSummary }
            : n
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

  const { t, dir } = useTranslation();

  // Handle direction based on language
  useEffect(() => {
    note.language === "fa"
      ? setDirection("rtl")
      : setDirection("ltr");
  }, [note.language]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Back Button */}
      {dir === "ltr" ? (
        <FaArrowLeft
          className="m-5 cursor-pointer text-xl text-gray-500 transition hover:text-primary"
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        <FaArrowRight
          className="m-5 cursor-pointer text-xl text-gray-500 transition hover:text-primary"
          onClick={() => {
            navigate(-1);
          }}
        />
      )}

      {/* Action Buttons */}
     <div className="flex flex-wrap items-center justify-center gap-3 px-5 pb-5">
        <button
          onClick={() => {
            setModelOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary hover:text-gray-900 active:scale-95"
        >
          <LuPen className="text-lg" />
          {t("edit_note")}
        </button>

        <button
          onClick={handleTakeQuizClick}
          disabled={quizLoading}
          className="flex items-center gap-2 rounded-lg border border-secondary/40 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-secondary hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FaQuestionCircle className="text-base text-primary" />
          {quizLoading
            ? t("loading_quiz")
            : t("take_quiz")}
        </button>

        <button
          onClick={handleSummaryClick}
          disabled={summaryLoading}
          className="flex items-center gap-2 rounded-lg border border-secondary/40 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-secondary hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MdSummarize className="text-lg text-primary" />
          {summaryLoading
            ? t("loading_summary")
            : t("ai_summary")}
        </button>

        <button
          onClick={() => toPDF()}
          title="Download Note as PDF Image (Not Selectable)"
          className="flex items-center gap-2 rounded-lg border border-secondary/40 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-secondary hover:bg-secondary/10 active:scale-95"
        >
          <FaDownload className="text-sm text-primary" />
          {t("download_pdf")}
        </button>
      </div>

      {/* Edit Modal */}
      {openModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <AddNote
            initialNoteData={note}
            closeModel={() => {
              setModelOpen(false);
            }}
            formTitle={t("edit_note")}
            onSubmit={handleUpdate}
            buttonText={t("update_title")}
          />
        </div>
      )}

      {/* Quiz Modal */}
      {openQuiz && quizQuestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <Quiz
            questions={quizQuestions}
            closeQuiz={() => {
              setOpenQuiz(false);
            }}
            contentDirection={direction}
          />
        </div>
      )}

      {/* Summary Modal */}
      {openSummary && (
        <Summary
          closeSummary={() => {
            setOpenSummary(false);
          }}
          summary={noteSummary}
          noteTitle={note.title}
          contentDirection={direction}
        />
      )}

      {/* Note Content */}
      <div
        className="mx-5 mb-5 overflow-hidden rounded-xl border border-secondary/30 shadow-sm"
        style={{ backgroundColor: noteAreaColor }}
      >
        {/* Background Color Controls */}
        <div className="flex items-center justify-end gap-3 border-b border-black/5 px-5 py-3">
          <label
            htmlFor="note-bg-color"
            className="text-sm font-medium text-gray-600"
          >
            {t("bg_color")}
          </label>

          <div className="flex items-center">
            <input
              type="color"
              id="note-bg-color"
              className="h-9 w-12 cursor-pointer rounded-md border border-gray-300 bg-white p-1"
              value={noteAreaColor}
              onChange={(e) =>
                setNoteAreaColor(e.target.value)
              }
            />
          </div>
        </div>

        {/* Printable Note Area */}
        <div
          ref={targetRef}
          className="mx-auto max-w-4xl px-6 py-8 sm:px-10 sm:py-10"
          style={{ direction: direction }}
        >
          <small className="text-sm text-gray-400">
            {note.date}
          </small>

          <h3 className="mt-5 text-base font-semibold text-gray-700 sm:text-lg">
            <span className="text-primary">
              {t("subject")}:
            </span>{" "}
            {note.subject}
          </h3>

          <h4 className="mt-3 text-xl font-bold text-gray-800 sm:text-2xl">
            <span className="text-secondary">
              {t("title")}:
            </span>{" "}
            {note.title}
          </h4>

          <div
            className="mt-5 text-sm leading-7 text-gray-700 sm:text-base"
            dangerouslySetInnerHTML={{
              __html: note.content,
            }}
          />
        </div>
      </div>
    </>
  );
}
