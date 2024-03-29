import MapContainer from "@/src/components/map";
import Header from "@/src/components/navbar";
import BathroomList from "@/src/components/scrollBathrooms";
import "./globals.css";
import Navbar from "@/src/components/navbar";
import Opener from "@/src/components/dom/Opener";
import AddButton from "@/src/components/addButton";

export default function Page() {

  return (
    <div>
      <div className="absolute top-0 right-0 z-10 w-screen">
        < Navbar/>
      </div>
      <div>
        <MapContainer/>
      </div>
      <div className="absolute bottom-0 right-0 z-10 w-screen p-6">
        <div className='flex  flex-row-reverse'>
          < AddButton/>
        </div>
      </div>
    </div>
  );
}

{/* <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a> */}