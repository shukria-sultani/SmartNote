import { HiMiniPuzzlePiece   } from 'react-icons/hi2';
import { IoMdCopy } from 'react-icons/io';
import { Search } from 'lucide-react';
import { FiShuffle } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslationContext';

export default function Problems (){
    const {t} = useTranslation()
    return(
        <>
        <div className="problems">
           
           <h1>{t("challenge_title")}</h1>
    

        <div className='problem-cards'>
           <div>
                             <IoMdCopy></IoMdCopy>

               <h3>{t("challenge_1_title")}</h3>
               <p>{t("challenge_1_description")}</p>
           </div>
           <div>
              <Search style={{width: "40px", height: "40px"}}></Search>
              <h3>{t("challenge_2_title")}</h3>
              <p>{t("challenge_2_description")}</p>
           </div>
           <div>
            <FiShuffle></FiShuffle>
               <h3>{t("challenge_3_title")}</h3>
              <p>{t("challenge_3_description")}</p>
           </div>
        </div>
        
       </div> 
        </>
    )
}