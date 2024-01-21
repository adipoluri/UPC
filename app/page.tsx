import MapContainer from "@/src/components/map";
import Header from "@/src/components/navbar";
import { createClient } from "@/src/utils/supabase/server";
import { cookies } from "next/headers";

export default function Page() {

  return (
    <div className="flex p-4 h-dvh" >
      <div className="flex-none w-12 h-12 ...">
        01
      </div>
      <div className="grow w-5/6">
        <MapContainer/>
      </div>
    </div>
  );
}

{/* <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a> */}