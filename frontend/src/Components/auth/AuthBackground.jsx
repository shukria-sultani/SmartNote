
import {
  LuPencil,
  LuBookOpen,
  LuNotebookPen,
  LuPaperclip,
  LuFileText,
  LuHighlighter,
  LuBookmark,
  LuStickyNote, } from "react-icons/lu";

export default function AuthBackground() {
  const icons = [
    {
      Icon: LuPencil,
      position: "left-[8%] top-[12%]",
      rotate: "-rotate-45",
      size: "text-5xl",
      color: "text-primary",
    },
    {
      Icon: LuNotebookPen,
      position: "left-[15%] top-[40%]",
      rotate: "rotate-12",
      size: "text-6xl",
      color: "text-secondary",
    },
    {
      Icon: LuBookOpen,
      position: "left-[7%] bottom-[15%]",
      rotate: "-rotate-12",
      size: "text-5xl",
      color: "text-primary",
    },
    {
      Icon: LuPaperclip,
      position: "left-[25%] top-[22%]",
      rotate: "rotate-45",
      size: "text-4xl",
      color: "text-secondary",
    },
    {
      Icon: LuFileText,
      position: "right-[10%] top-[14%]",
      rotate: "rotate-12",
      size: "text-5xl",
      color: "text-secondary",
    },
    {
      Icon: LuHighlighter,
      position: "right-[7%] top-[43%]",
      rotate: "-rotate-45",
      size: "text-6xl",
      color: "text-primary",
    },
    {
      Icon: LuBookmark,
      position: "right-[12%] bottom-[15%]",
      rotate: "rotate-12",
      size: "text-5xl",
      color: "text-secondary",
    },
    {
      Icon: LuStickyNote,
      position: "right-[27%] bottom-[28%]",
      rotate: "-rotate-12",
      size: "text-4xl",
      color: "text-primary",
    },
  ]; 

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-lime-50">
      {/* Gradient decorations */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute right-[25%] top-[15%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      {/* Note icons */}
      {icons.map(({ Icon, position, rotate, size, color }, index) => (
        <div
          key={index}
          className={`absolute ${position} ${rotate} ${color} ${size} opacity-50 transition-transform duration-500`}
        >
          <Icon strokeWidth={1.4} />
        </div>
      ))}
    </div>
  );
}
