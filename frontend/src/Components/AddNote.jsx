
import { LuNotebookText } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useTranslation } from "../hooks/useTranslationContext";

export default function AddNote({
  onSubmit,
  initialNoteData = null,
  formTitle,
  closeModel,
  buttonText,
}) {
  const [noteData, setNoteData] = useState(
    initialNoteData || {
      title: "",
      subject: "",
      language: "en",
      content: "",
    }
  );

  const handleChange = (e) => {
    const { id, value } = e.target;

    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [id]: value,
    }));
  };

  // Handle React Quill
  const handleContent = (contentValue) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      content: contentValue,
    }));
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const handleSubmit = () => {
    const date = new Date();

    const newNote = {
      id: initialNoteData ? initialNoteData.id : Date.now(),
      ...noteData,
      date: date.toLocaleString("en-US", options),
    };

    onSubmit(newNote);

    if (!initialNoteData) {
      setNoteData({
        title: "",
        subject: "",
        language: "en",
        content: "",
      });
    }
  };

  // Prevent main page from scrolling while modal is open
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      {/* Modal */}
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-secondary/40 bg-white shadow-xl">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <LuNotebookText className="text-2xl text-primary" />
            {formTitle}
          </h2>

          <IoMdClose
            className="cursor-pointer rounded-full p-1 text-3xl text-gray-500 transition hover:bg-secondary hover:text-white"
            onClick={closeModel}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-6 py-6"
        >
          {/* Title */}
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="title"
              className="font-semibold text-gray-700"
            >
              {t("note_title")}:
            </label>

            <input
              type="text"
              id="title"
              required
              spellCheck
              value={noteData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Subject */}
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="subject"
              className="font-semibold text-gray-700"
            >
              {t("note_subject")}:
            </label>

            <input
              type="text"
              id="subject"
              required
              spellCheck
              value={noteData.subject}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Language */}
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="language"
              className="font-semibold text-gray-700"
            >
              Choose the note language:
            </label>

            <select
              id="language"
              value={noteData.language}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            >
              <option value="en">{t("en")}</option>
              <option value="fa">{t("fa")}</option>
            </select>
          </div>

          {/* Content */}
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="content"
              className="font-semibold text-gray-700"
            >
              {t("note_content")}:
            </label>

            <ReactQuill
              theme="snow"
              value={noteData.content}
              onChange={handleContent}
              spellCheck
              className="w-full overflow-hidden rounded-lg border border-gray-300 focus-within:border-primary"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:bg-secondary hover:text-gray-900 active:scale-[0.98]"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
