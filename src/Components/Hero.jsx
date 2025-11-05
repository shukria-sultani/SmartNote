import {Link} from "react-router-dom"
import heroImg from "../assets/images/h.jpg"
import { useTranslation } from "../hooks/useTranslationContext"
export default function Hero()

{
     const {t}  = useTranslation()
     return(
        <>
  <div className="hero">
         <div>
          <h2>{t("hero_h1")} <br />
              {t("hero_h1_nextLine")}
</h2>
            <p dangerouslySetInnerHTML={{ __html: t("hero_p") }} />
          <Link to="/notes">{t("hero_button")}</Link>

         </div>

                    <img src={heroImg} alt="" />
            </div>
     </>
     )
}