"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session = useSession();


  return (
    <>
      <div className="flex justify-between">
        <div>Exotify</div>
        <div>
            {session.data?.user ? ( <button className="m-2 p-2 bg-blue-500" onClick={() => signOut()}>
            Logout
          </button> ) : 

         ( <button className="m-2 p-2 bg-blue-500" onClick={() => signIn()}>
            Sign In
          </button> )}
        </div>
      </div>
    </>
  );
}
