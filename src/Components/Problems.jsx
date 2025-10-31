import { HiMiniPuzzlePiece   } from 'react-icons/hi2';
import { IoMdCopy } from 'react-icons/io';
import { IoMdArchive } from 'react-icons/io';
import { LuWarehouse } from 'react-icons/lu';

export default function Problems (){
    return(
        <>
        <div className="problems">
           
           <h1>The Challenge: Where Great Ideas Get Lost</h1>
           <p>Fragmented thoughts, endless searching, and mental clutter hold your back.</p>

        <div className='problem-cards'>
           <div>
                             <IoMdCopy></IoMdCopy>

               <h3>Fragmented Notes</h3>
               <p>Your ideas are scattered across physical pads, digital sticky notes, and emails. Momentum is killed switching between tools.</p>
           </div>
           <div>
               <IoMdArchive></IoMdArchive>
              <h3>Search Anxiety</h3>
              <p>Searching for information feels like digging through a landfill. You spend more time finding old ideas than creating new ones.</p>
           </div>
           <div>
                <LuWarehouse></LuWarehouse>

              <h3>No Organization</h3>
              <p>Without proper structure, every new note adds to the mental clutter. Your system works against you, leading to idea fatigue.</p>
           </div>
        </div>
        
       </div> 
        </>
    )
}