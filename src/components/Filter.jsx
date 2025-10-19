import { useState } from "react"

export default function Filter ({ subjects }){

   return(
    <>
     <div className="filter">
      <select name="subject-filter" id="subject-filter">
        <option value="">Filter the notes by subject</option>
        {Array.isArray(subjects) && subjects.map((subject, index) =>{
         return (<option key={subject || index} value={subject}>{subject}</option>)
        })}
      </select>
     </div>
    </>
   )
}