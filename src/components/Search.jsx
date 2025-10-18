  import { FaSearch } from 'react-icons/fa';
export default function Search(){
      return(
        <div className="search-bar">
           <form action="">
             <input type="text"  placeholder="Search notes by keywords..."/>  <FaSearch className='search-icon' />
           </form>
        </div>
      )
}