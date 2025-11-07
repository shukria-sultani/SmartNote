import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { IoMdClose } from "react-icons/io"
import { FaDownload } from 'react-icons/fa';
import { usePDF } from 'react-to-pdf';
import { useTranslation } from '../hooks/useTranslationContext';
export default function Summary ({noteTitle, closeSummary, summary}){
      // Handle main vertical scroll
  useEffect(() => {
        document.body.classList.add('no-scroll');
                return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const {toPDF, targetRef} = usePDF({
      filename: `${noteTitle || "Note"}_Summary.pdf`,
    resolution: 5, 
    page: { margin: 25.4 }, 
    })
    const {t}  = useTranslation()
      return (
        <>
        <div className="summary-container">
         <div className="note-summary">
            <IoMdClose className="closeIcon" onClick={closeSummary}></IoMdClose>
            <button onClick={()=> toPDF()}><FaDownload></FaDownload> {t("download_pdf")}</button>
            <div ref={targetRef}>
             <h2>{t("summary_for")} {noteTitle}</h2>
               <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
         </div>
         </div>
        </>
      )
}
