
import { LuNotebookText } from 'react-icons/lu';
export default function Header()
{
     return(
        <>
        <header>
              <h1><LuNotebookText style={{"fontSize": "1.4rem"}}></LuNotebookText> SmartNote</h1>
            <div>
              
                <ul>
                    <li>Home</li>
                    <li>My Notes</li>
                </ul>
            </div>
   </header>
            
     </>
     )
}