import { NavLink } from "react-router-dom";
import { LuClock, LuNotebookText, LuTrash2, LuLogOut } from "react-icons/lu";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";

import { useTranslation } from "../hooks/useTranslationContext";

const navItems = [
  { to: "/recent", icon: LuClock, labelKey: "Recent" },
  { to: "/notes", icon: LuNotebookText, labelKey: "nav_link_notes" },
  { to: "/trash", icon: LuTrash2, labelKey: "Trash" },
];

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const { language, t, setLanguage } = useTranslation();

  return (
    <>
    
      {!showMenu && (
        <button
          onClick={() => setShowMenu(true)}
          aria-label="Open menu"
          className="fixed start-4 top-4 z-50 rounded-lg bg-orange-400 px-3 py-2 text-white
                     shadow-sm transition-colors hover:bg-lime-400 hover:text-orange-400"
        >
          <BiMenu className="text-3xl" />
        </button>
      )}
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="fixed inset-0 z-30 bg-black/30 sm:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-40 flex w-72 max-w-[85vw] flex-col
          border-e border-gray-200 bg-white transition-transform duration-300 sm:w-64
          ${
            showMenu
              ? "translate-x-0 shadow-xl sm:shadow-none"
              : "-translate-x-full rtl:translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b-2 border-gray-200 ps-6 pe-4">
          <h1 className="truncate text-lg font-bold text-gray-800">
            {t("app_title")}
          </h1>
          <button
            onClick={() => setShowMenu(false)}
            aria-label="Close menu"
            className="shrink-0 rounded-lg p-1.5 text-gray-700 transition-colors
                       hover:bg-lime-400 hover:text-orange-400"
          >
            <BiMenu className="text-2xl" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-2">
            {navItems.map(({ to, icon: Icon, labelKey }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3.5
                     text-sm font-medium transition-all duration-200
                     ${
                       isActive
                         ? "bg-[rgba(166,207,1,0.15)] text-[rgb(90,112,0)]"
                         : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                     }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`absolute inset-y-2.5 start-0 w-1 rounded-e-full bg-[rgb(166,207,1)]
                                    transition-opacity ${
                                      isActive ? "opacity-100" : "opacity-0"
                                    }`}
                      />
                      <Icon
                        className={`shrink-0 text-xl transition-colors ${
                          isActive
                            ? "text-[rgb(130,165,0)]"
                            : "text-gray-400 group-hover:text-orange-500"
                        }`}
                      />
                      <span className="truncate">{t(labelKey)}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100">
          <div className="p-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Language"
              className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white
                         px-3 py-3 text-base font-medium text-gray-700 outline-none
                         transition-colors hover:border-orange-300
                         focus:border-[rgb(166,207,1)] focus:ring-2 focus:ring-[rgba(166,207,1,0.25)]"
            >
              <option value="en">🇺🇸 English</option>
              <option value="fa">🇦🇫 فارسی</option>
            </select>
          </div>

          <button
            className="flex w-full items-center gap-3 border-t border-gray-100 px-6 py-4
                       text-base font-medium text-gray-600 transition-colors
                       hover:bg-red-50 hover:text-red-500"
          >
            <LuLogOut className="shrink-0 text-xl rtl:-scale-x-100" />
            <span>{t("logout")}</span>
          </button>
        </div>
      </aside>
    </>
  );
}