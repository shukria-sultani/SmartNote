import {Link} from "react-router-dom"
import _404Imge from "../assets/images/404.png"
import { useTranslation } from "../hooks/useTranslationContext"
export default function NotFound(){
    const {t} = useTranslation()
    return (
        <div className="not-found">
            <img src={_404Imge} alt="" />
            <h1>{t("not_found")}</h1>
            <Link to="/">{t("get_back_home")}</Link>
        </div>
    )
}