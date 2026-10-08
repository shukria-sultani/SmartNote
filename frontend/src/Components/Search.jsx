
import { FaSearch } from "react-icons/fa";

import { useTranslation } from "../hooks/useTranslationContext";

export default function Search({ setSearch }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { t } = useTranslation();

  return (
    <div className="w-full sm:w-auto">
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:w-72"
      >
        <input
          type="text"
          placeholder={t("search_text")}
          onChange={handleChange}
          className="w-full rounded-lg border border-secondary/40 bg-white py-2.5 pl-4 pr-10 text-sm text-gray-700 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-secondary focus:border-primary focus:ring-2 focus:ring-primary/20"
        />

        <FaSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
      </form>
    </div>
  );
}
