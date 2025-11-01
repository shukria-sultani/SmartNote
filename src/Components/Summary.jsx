import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { IoMdClose } from "react-icons/io"
export default function Summary ({noteTitle, closeSummary, summary}){
      // Handle main vertical scroll
  useEffect(() => {
        document.body.classList.add('no-scroll');
                return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);
      return (
        <>
        <div className="summary-container">
         <div className="note-summary">
            <IoMdClose className="closeIcon" onClick={closeSummary}></IoMdClose>
             <h2>Summary for: {noteTitle}</h2>
               <ReactMarkdown>{summary}</ReactMarkdown>
              
         </div>
         </div>
        </>
      )
}
