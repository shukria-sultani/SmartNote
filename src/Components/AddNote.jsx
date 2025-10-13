
import { LuNotebookText } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
export default function AddNote({closeModal}){
    return(
        <>
         <div class="noteForm-container">
              <IoMdClose className='closeIcon'onClick={closeModal}></IoMdClose> 
            <h2><LuNotebookText style={{"fontSize": "1.4rem", "color": "rgb(255, 158, 1)"}}></LuNotebookText> Add a new Note</h2> 
             <form action="">
                <label htmlFor="title">Enter the title:</label>
               <input type="text" id="title" required spellCheck/>
               <label htmlFor="subject">Enter  the subject:</label>
               <input type="text" id="subject" required spellCheck/>
               <label htmlFor="content">Enter the note content:</label>
               <textarea type="text" id="content" required spellCheck/>
                <button>Add</button>
             </form>
     
        </div> 
        
        </>
    )
}