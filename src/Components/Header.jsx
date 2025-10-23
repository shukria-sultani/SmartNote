import { NavLink } from 'react-router-dom';
import { LuNotebookText } from 'react-icons/lu';
import { FaHome } from 'react-icons/fa';
export default function Header(){

const activeLink = ({isActive}) =>
{
  isActive ? "active" : ""
}
{
     return(
        <>
        <header>
              <h1><LuNotebookText style={{"fontSize": "1.4rem"}}></LuNotebookText> SmartNote</h1>
            <div>
              
                <ul>
                    <li className={activeLink}><NavLink to="/"><FaHome ></FaHome> Home</NavLink></li>
                    <li className={activeLink}><NavLink to="/notes"><LuNotebookText></LuNotebookText> Notes</NavLink> </li>
                </ul>
            </div>
   </header>
            
     </>
     )
}

}