import {Link} from "react-router-dom"
import heroImg from "../assets/images/h.jpg"
export default function Hero()
{
     return(
        <>
  <div className="hero">
         <div>
          <h2>Connect Your Thoughts. <br />
               Fuel Your Progress!
</h2>
            <p>Get AI Summary, Take Quiz, <br /> Master Your Studies With SmartNote</p>
          <Link to="/notes">Go to my Notes</Link>

         </div>

                    <img src={heroImg} alt="" />
            </div>
     </>
     )
}