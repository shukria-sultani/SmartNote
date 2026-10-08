import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
export default function MainLayout() {
     return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}