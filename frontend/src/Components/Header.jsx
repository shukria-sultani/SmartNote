import { NavLink } from 'react-router-dom';
import { LuNotebookText } from 'react-icons/lu';
import { FaHome } from 'react-icons/fa';
import { FaExclamationCircle } from 'react-icons/fa';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslationContext';
export default function Header(){
const [showMenu, setShowMenu] = useState(false);
const {language, t, setLanguage, dir} = useTranslation()
const handleLanguageToggle = (e)=>{
     setLanguage(e.target.value)
}
const handleMenuDisplay = ()=>{
  setShowMenu(!showMenu)
}
const activeLink = ({isActive}) =>
{
  isActive ? "active" : ""
}
{
     return(
        <>
        <header>
              <h1><LuNotebookText style={{"fontSize": "1.4rem"}} className='noteIcon'></LuNotebookText> 
              {t("app_title")}</h1>
              <div className='menu-icon'>
                  <MenuIcon onClick={handleMenuDisplay}></MenuIcon>
              </div>
            
                  <div className={showMenu ? 'nav-links show' : 'nav-links'}>
              
                <ul>
                    <li className={activeLink}><NavLink to="/"> <FaHome></FaHome> {t("nav_link_home")}</NavLink></li>
                    <li className={activeLink}><NavLink to="/notes"><LuNotebookText></LuNotebookText> {t("nav_link_notes")}</NavLink> </li>
                    <li className={activeLink}><NavLink to="/about"><FaExclamationCircle></FaExclamationCircle> {t("nav_link_about")}</NavLink> </li>
                    <select name="" id="" onChange={handleLanguageToggle} value={language} style={{marginLeft: "10px" }}>
                      <option value="en">English</option>
                      <option value="fa">فارسی</option>
                    </select>
                </ul>

            </div>
                
              
            
  
   </header>
            
     </>
     )
}

}
