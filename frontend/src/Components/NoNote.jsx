import { FaPlus } from "react-icons/fa";
import noNoteImg from "../assets/images/note.gif"
import { useTranslation } from "../hooks/useTranslationContext";
export default function NoNote({openForm}){
       const {t} = useTranslation()
       return (
        <>
         <div className="flex flex-col justify-center h-screen gap-4 items-center">
            <img src={noNoteImg} alt="Note Writing Icon" className="w-70 h-70" />
            <div className="flex items-center flex-col">
            <h2 className="font-bold">{t("no_note")}</h2> 
              <p>{t("capture_thougths")}</p>
            </div>
              <button  
              className="bg-orange-400 text-white px-3 py-2 transition-all duration-300 rounded-full hover:bg-secondary hover:text-black"  
              onClick={openForm}>
              <FaPlus className="inline-block me-2"></FaPlus> 
              {t("add_note")}
              </button>

         </div>
        
        </>
       )
}