import {Link} from "react-router-dom"
export default function Hero()
{
     return(
        <>
  <div className="hero">
                <h1>Hey Welcome! 👋</h1>
                <h2>Unlock Your Learning <br /> Potential!</h2>
                <p>Organize, Summarize, Take Quizes. 
                    Master your studies with  <strong style={{"color": "rgb(255, 158, 1)"}}>AI-powered</strong> insights.
                    </p>
                    <h3>All with SmartNote.</h3>
                    <Link to="/notes">Go to my Notes</Link>
            </div>
     </>
     )
}