import whyImage from "../assets/images/why.png"
import { useTranslation } from "../hooks/useTranslationContext"
import Problems from "./Problems"
import Solutions from "./Solutions"
export default function WhySmartNote(){
    const {t} = useTranslation()
    return(


        <>
          <div className="why-smartNote">
            <h1>{t("why_smartNote")}</h1>
            <div>
            <h2>{t("clarity")}</h2>
            <h4>{t("org_knowledge")}</h4>
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