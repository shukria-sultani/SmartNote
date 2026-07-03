  import { FaSearch } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslationContext';
export default function Search({setSearch}){
  const handleChange= (event)=>{
      setSearch(event.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  const {t} = useTranslation()
      return(
        <div className="search-bar">
           <form action="" onSubmit={handleSubmit}>
             <input type="text"  placeholder={t("search_text")} onChange={handleChange}/>  <FaSearch className='search-icon' />
           </form>
        </div>
      )
}
