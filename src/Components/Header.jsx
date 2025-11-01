import { NavLink } from 'react-router-dom';
import { LuNotebookText } from 'react-icons/lu';
import { FaHome } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import { MenuIcon } from 'lucide-react';
export default function Header(){

const activeLink = ({isActive}) =>
{
  isActive ? "active" : ""
}
{
     return(
        <>
        <header>
              <h1><LuNotebookText style={{"fontSize": "1.4rem"}} className='noteIcon'></LuNotebookText> SmartNote</h1>
            <div className='nav-links'>
              
                <ul>
                    <li className={activeLink}><NavLink to="/"> <FaHome></FaHome> Home</NavLink></li>
                    <li className={activeLink}><NavLink to="/notes"><LuNotebookText></LuNotebookText> Notes</NavLink> </li>
                    <li className={activeLink}><NavLink to="/about"><FaExclamationCircle></FaExclamationCircle> About</NavLink> </li>
                </ul>
            </div>
  
   </header>
            
     </>
     )
}

}
