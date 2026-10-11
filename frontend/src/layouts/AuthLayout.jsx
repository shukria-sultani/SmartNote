import { Outlet } from "react-router-dom";
import AuthBackground from "../Components/auth/AuthBackground";


export default function AuthLayout(){
    return(
         <div>
           <AuthBackground />
           <Outlet />
         </div>
    )
}