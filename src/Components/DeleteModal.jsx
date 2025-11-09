import { useTranslation } from "../hooks/useTranslationContext"


export default function DeleteModal ({onConfirm, onCancel, noteId}){
 if(noteId === null) return null
 const {t}  = useTranslation()
     return(
   <div className="main-delete-con">
        <div className="delete-container">
            <h3>{t("delete_confirmation")}</h3>
            <button onClick={onConfirm}>{t("yes")}</button>
            <button onClick={onCancel}>{t("cancel")}</button>
        </div>
        </div>
     )
}