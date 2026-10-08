
import { useNavigate } from "react-router-dom";
import { CgReadme } from "react-icons/cg";
import { FaTrash } from "react-icons/fa";

import { useTranslation } from "../hooks/useTranslationContext";

export default function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  const readNote = (noteId) => {
    navigate(`/read/${noteId}`);
  };

  const { t } = useTranslation();

  return (
    <div className="group w-full overflow-hidden rounded-xl border border-secondary/30 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-secondary/60 hover:shadow-md">

      <div className="flex items-center justify-end gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
        <button
          onClick={() => readNote(note.id)}
          className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-secondary hover:text-gray-900 active:scale-95"
        >
          <CgReadme className="text-lg" />
          {t("read")}
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white active:scale-95"
        >
          <FaTrash className="text-sm" />
          {t("delete")}
        </button>
      </div>

      <div className="p-5">
        <small className="text-sm text-gray-400">
          {t("last_modified")}: {note.date}
        </small>

        <h4 className="mt-4 text-base font-semibold text-gray-700">
          <span className="text-primary">{t("subject")}:</span>{" "}
          {note.subject}
        </h4>

        <h4 className="mt-2 text-lg font-bold text-gray-800">
          <span className="text-secondary">{t("title")}:</span>{" "}
          {note.title}
        </h4>

        <div
          className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </div>
    </div>
  );
}

