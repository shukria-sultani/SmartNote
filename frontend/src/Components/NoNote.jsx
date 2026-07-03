import { FaPlus } from "react-icons/fa";
import noNoteImg from "../assets/images/note.gif"
import { useTranslation } from "../hooks/useTranslationContext";
export default function NoNote({openForm}){
       const {t} = useTranslation()
       return (
        <>
         <div className="no-note">
            <img src={noNoteImg} alt="" />

            <h2>{t("no_note")}</h2> 
              <p>{t("capture_thougths")}</p>

              <button onClick={openForm}><FaPlus></FaPlus> {t("add_note")}</button>

         </div>
        
        </>
       )
}