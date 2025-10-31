import whyImage from "../assets/images/why.png"
import Problems from "./Problems"
import Solutions from "./Solutions"
export default function WhySmartNote(){
    return(

        <>
          <div className="why-smartNote">
            <h1>Why SmartNote?</h1>
            <div>
            <h2>Clarity From Chaos</h2>
            <h4>SmartNote transforms fragmented thoughts into organized knowledge.</h4>
            </div>
             <img src={whyImage} alt="" />
          </div>
           <div className="problem-solution">
            <Problems></Problems>
            <Solutions></Solutions>
            </div>
        </>
    )
}