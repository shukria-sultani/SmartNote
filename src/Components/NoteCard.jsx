import {Link, useNavigate, useParams} from "react-router-dom"
import { CgReadme } from "react-icons/cg"
import { FaTrash } from "react-icons/fa"
import { useTranslation } from "../hooks/useTranslationContext"
export default function NoteCard({note, onDelete}) {
  const navigate = useNavigate()
   const readNote = (noteId)=>{
      navigate(`/read/${noteId}`)
   }
   const {t}  = useTranslation()

  return (
    <>
          <div className="main-container">
                <div className="actions">
                  <button onClick={()=>{readNote(note.id)}}><CgReadme style={{fontSize: "1.2rem"}}></CgReadme>  {t("read")}</button>
                  <button onClick={() => onDelete(note.id)}><FaTrash></FaTrash> {t("delete")}</button>
                
                </div>
            <div className="note-card">
              <h4>{t("subject")}: {note.subject}</h4>
              <h4>{t("title")}: {note.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: note.content}}></p>
            </div>
          </div>
   
    </>
  );
}
