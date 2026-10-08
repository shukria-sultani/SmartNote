import { NavLink } from "react-router-dom";
import {
  LuClock,
  LuNotebookText,
  LuTrash2,
  LuLogOut,
} from "react-icons/lu";
import { BiMenu, BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslationContext";
import UserProfile from "./UserProfile";

const navItems = [
  { to: "/recent", icon: LuClock, labelKey: "Recent" },
  { to: "/notes", icon: LuNotebookText, labelKey: "nav_link_notes" },
  { to: "/trash", icon: LuTrash2, labelKey: "Trash" },
];

export default function Sidebar() {

  const [showMenu, setShowMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { language, t, setLanguage } = useTranslation();
  return (
    <>
      {!showMenu && (
        <button
          onClick={() => setShowMenu(true)}
          aria-label="Open menu"
          className="
            fixed start-4 top-4 z-50
            rounded-lg
            bg-orange-400
            p-2.5
            text-white
            shadow-md
            transition-colors
            hover:bg-lime-400
            hover:text-orange-400
            lg:hidden
          "
        >
          <BiMenu className="text-2xl" />
        </button>
      )}

      <aside
        className={`
          fixed inset-y-0 start-0 z-40
          flex flex-col
          border-e border-gray-200
          bg-white
          p-6
          transition-all duration-300

          ${showMenu ? "translate-x-0" : "-translate-x-full"}

          lg:static
          lg:translate-x-0
          lg:shrink-0

          ${collapsed ? "lg:w-20" : "lg:w-72"}
        `}
      >

        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="
            absolute
            end-0
            top-6
            z-50
            hidden
            h-10
            w-10
            translate-x-1/2
            items-center
            justify-center
            rounded-full
            bg-orange-400
            text-white
            shadow-md
            transition-all
            lg:flex
          "
        >
          <BiChevronRight
            className={`
              text-2xl
              transition-transform
              duration-300
              ${collapsed ? "" : "rotate-180"}
            `}
          />
        </button>

        <div
          className={`
            flex
            h-auto
            shrink-0
            items-center
            border-b-2
            border-gray-200

            ${collapsed
              ? "lg:justify-center"
              : "justify-between gap-4"
            }
          `}
        >
         { !collapsed && (
            <UserProfile ></UserProfile>
            )
         }
       

          <button
           onClick={() => setShowMenu(false)}
           aria-label="Close menu"
           className={
            `
            flex
            absolute
            end-0
            z-50
            h-10
            w-10
            translate-x-1/2
            items-center
            justify-center
            rounded-full
            text-center
            bg-orange-400
            text-white
            shadow-md
            transition-all
            ${
             !showMenu &&(
               "hidden"
             ) 
            }
          `}
          >
            <BiChevronRight
            className={`
              text-2xl
              transition-transform
              duration-300
             rotate-180
          
            `}
          />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="flex flex-col gap-2">
            {navItems.map(({ to, icon: Icon, labelKey }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    flex
                    items-center
                    rounded-xl
                    py-3.5
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${collapsed
                      ? "lg:justify-center lg:px-0"
                      : "gap-3 px-4"
                    }

                    ${isActive
                      ? "bg-[rgba(166,207,1,0.15)] text-[rgb(90,112,0)]"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>

                      <span
                        className={`
                          absolute
                          inset-y-2.5
                          start-0
                          w-1
                          rounded-e-full
                          bg-[rgb(166,207,1)]
                          transition-opacity
                          ${isActive
                            ? "opacity-100"
                            : "opacity-0"
                          }
                        `}
                      />


                      <Icon
                        className={`
                          shrink-0
                          text-xl
                          transition-colors

                          ${isActive
                            ? "text-[rgb(130,165,0)]"
                            : "text-gray-400 group-hover:text-orange-500"
                          }
                        `}
                      />


                      <span
                        className={`
                          truncate
                          ${collapsed ? "lg:hidden" : ""}
                        `}
                      >
                        {t(labelKey)}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-gray-100">

          <div
            className={`
              p-4
              ${collapsed ? "lg:hidden" : ""}
            `}
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Language"
              className="
                w-full
                cursor-pointer
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                py-3
                text-base
                font-medium
                text-gray-700
                outline-none
                transition-colors
                hover:border-orange-300
                focus:border-[rgb(166,207,1)]
                focus:ring-2
                focus:ring-[rgba(166,207,1,0.25)]
              "
            >
              <option value="en">🇺🇸 English</option>
              <option value="fa">🇦🇫 فارسی</option>
            </select>
          </div>


          <button
            className={`
              flex
              w-full
              items-center
              border-t
              border-gray-100
              py-4
              text-base
              font-medium
              text-gray-600
              transition-colors
              hover:bg-red-50
              hover:text-red-500

              ${collapsed
                ? "lg:justify-center lg:px-0"
                : "gap-3 px-6"
              }
            `}
          >
            <LuLogOut
              className="
                shrink-0
                text-xl
                rtl:-scale-x-100
              "
            />

            <span className={collapsed ? "lg:hidden" : ""}>
              {t("logout")}
            </span>
          </button>
        </div>
      </aside>

      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="
            fixed
            inset-0
            z-30
            bg-black/20
            lg:hidden
          "
        />
      )}
    </>
  );
}