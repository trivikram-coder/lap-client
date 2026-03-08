import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user && <Navbar />}

      <div className="container-fluid mt-4 px-0">
        <Outlet />
      </div>
    </>
  );

}