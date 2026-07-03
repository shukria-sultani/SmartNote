import { useState } from "react"
import { useTranslation } from "../hooks/useTranslationContext"

export default function Filter ({ subjects, setFilter }){
  const {t}  = useTranslation()
   return(
    <>
     <div className="filter">
      <select name="subject-filter" id="subject-filter" onChange={(e)=>{setFilter(e.target.value)}}>
        <option value="">{t("filter_text")}</option>
        {Array.isArray(subjects) && subjects.map((subject, index) =>{
         return (<option key={subject || index} value={subject}>{subject}</option>)
        })}
      </select>
     </div>
    </>
   )
}
