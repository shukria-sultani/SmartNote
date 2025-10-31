import { FaMagic } from 'react-icons/fa';
import { FaBrain } from 'react-icons/fa';

import { FaSearch } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';

export default function Solutions(){
    return(
        <>
         <div className="solutions">
            <h1>The SmartNote Solutions: Clarity and Intelligence</h1>
         </div>
           

           <div className="solution-card">
            <div>
                <FaMagic></FaMagic>
                <h3>AI-Powered Summary</h3>
                <p>Solves Information Overload. Instantly distill long notes, articles, or meeting transcripts into concise, key takeaways.</p>
            </div>
            <div>
            <FaBrain></FaBrain>
                <h3>Auto-Quiz Generation</h3>
                <p>Solves Passive Learning. Turn any note into a customized study quiz to actively test your knowledge and maximize retention.</p>
            </div>
            <div>
                <FaSearch className='search'></FaSearch>
                <h3> Instant Global Search</h3>
                <p>Solves Search Anxiety. Finds keywords, titles, and content across every note in milliseconds. Searching is now instant recall.</p>
            </div>
            <div>
                <FaTags></FaTags>
                <h3>Smart Subject Filtering</h3>
                <p>Solves Fragmentation. Quickly assign subjects with one tap and use the filter bar to isolate projects, topics, or categories instantly.</p>
            </div>
           </div>
        
        </>
    )
}