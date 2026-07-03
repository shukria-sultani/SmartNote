import { FaMagic } from 'react-icons/fa';
import { FaBrain } from 'react-icons/fa';

import { FaSearch } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslationContext';

export default function Solutions(){
    const {t} = useTranslation()
    return(
        <>
         <div className="solutions">
            <h1>{t("solution_title")}</h1>
         </div>
           

           <div className="solution-card">
            <div>
                <FaMagic></FaMagic>
                <h3>{t("solution_1_title")}</h3>
                <p>{t("solution_1_description")}</p>
            </div>
            <div>
            <FaBrain></FaBrain>
                  <h3>{t("solution_2_title")}</h3>
                <p>{t("solution_2_description")}</p>
            </div>
            <div>
                <FaSearch className='search'></FaSearch>
                 <h3>{t("solution_3_title")}</h3>
                <p>{t("solution_3_description")}</p>
            </div>
            <div>
                <FaTags></FaTags>
                <h3>{t("solution_4_title")}</h3>
                <p>{t("solution_4_description")}</p>
            </div>
           </div>
        
        </>
    )
}