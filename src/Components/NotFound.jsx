import {Link} from "react-router-dom"
import _404Imge from "../assets/images/404.png"
export default function NotFound(){
    return (
        <div className="not-found">
            <img src={_404Imge} alt="" />
            <h1>Page Not Found!</h1>
            <Link to="/">Get Back To Home</Link>
        </div>
    )
}