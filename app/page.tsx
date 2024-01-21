import MapContainer from "@/src/components/map";
import Header from "@/src/components/navbar";
import BathroomList from "@/src/components/scrollBathrooms";
import "./globals.css";
import Navbar from "@/src/components/navbar";
import Opener from "@/src/components/dom/Opener";

export default function Page() {

  return (
    <div>
      <div className="absolute top-0 right-0 z-10 w-screen">
        < Navbar/>
      </div>
      <div className="absolute top-0 left-0 z-10 p-4 h-screen">
        <BathroomList/>
      </div>
      <div className="flex p-4 pl-16 pt-20 h-dvh" >
        <div className="grow w-5/6">
          <MapContainer/>
        </div>
      </div>
    </div>
  );
}

{/* <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a> */}