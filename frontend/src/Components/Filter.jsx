
import { useTranslation } from "../hooks/useTranslationContext";

export default function Filter({ subjects, setFilter }) {
  const { t } = useTranslation();

  return (
    <div className="w-full sm:w-auto">
      <select
        name="subject-filter"
        id="subject-filter"
        onChange={(e) => setFilter(e.target.value)}
        className="w-full cursor-pointer rounded-lg border border-secondary/40 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-56"
      >
        <option value="">{t("filter_text")}</option>

        {Array.isArray(subjects) &&
          subjects.map((subject, index) => (
            <option key={subject || index} value={subject}>
              {subject}
            </option>
          ))}
      </select>
    </div>
  );
}
