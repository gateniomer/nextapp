import Link from "next/link"
import Cart from "./Cart"
import { useEffect, useState } from "react"
import { auth } from "../utils/firebase"
import { User,onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { signInUserWithEmailAndPassword, signInUserWithGooglePopup,signOutUser } from "../utils/firebase"

export default function Nav () {

  const [user,setUser] = useState<User|undefined>(undefined);

  
  useEffect(()=>{
    //Detect if user is signed In
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('Detected Signed In User!',user);
        setUser(user);
      } else {
        // User is signed out
        console.log('No Signed In User Detected.');
        setUser(undefined);
      }
    });
  },[])

  console.log('nav rendered');
  return (
  <div>
    <Link href={'/'}>Home</Link>
    <Cart/>
    {!user && <button onClick={()=>signInUserWithEmailAndPassword('test@gmail.com','123456')}>Sign In</button>}
    {!user && <button onClick={signInUserWithGooglePopup}>Google Sign In</button>}
    {user && <button onClick={signOutUser}>Sign Out</button>}
  </div>
  )
}