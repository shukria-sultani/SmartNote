import { IoMdClose } from "react-icons/io"
export default function Summary ({noteTitle, closeSummary, summary}){
      return (
        <>
        <div className="summary-container">
         <div className="note-summary">
            <IoMdClose className="closeIcon" onClick={closeSummary}></IoMdClose>
             <h2>Summary for: {noteTitle}</h2>
              <p>
               {summary}
              </p>
         </div>
         </div>
        </>
      )
}
