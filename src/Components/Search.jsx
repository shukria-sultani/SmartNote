  import { FaSearch } from 'react-icons/fa';
export default function Search({setSearch}){
  const handleChange= (event)=>{
      setSearch(event.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
  }
      return(
        <div className="search-bar">
           <form action="" onSubmit={handleSubmit}>
             <input type="text"  placeholder="Search notes by keywords..." onChange={handleChange}/>  <FaSearch className='search-icon' />
           </form>
        </div>
      )
}
