import Link from "next/link"
import Cart from "./Cart"
import { useEffect, useState,useRef, LegacyRef } from "react"
import { setUserToDb, auth, addItemToCart } from "../utils/firebase"
import { User,onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { signInUserWithEmailAndPassword, signInUserWithGooglePopup,signOutUser,signUpUserWithEmailAndPassword } from "../utils/firebase"

export default function Nav () {
  const [user,setUser] = useState<User|undefined>(undefined);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    //Detect if user is signed In
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('[Auth State] Detected Signed In User!');
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
        console.log('[Auth State] No Signed In User Detected.');
      }
    });
  },[])
  return (
  <div>
    <Link href={'/'}>Home</Link>
    <Cart/>
    {!user && <>
      <input type="email" ref={emailRef}/>
    <input type="password" ref={passwordRef}/>
    <button onClick={()=>signInUserWithEmailAndPassword(emailRef.current?.value,passwordRef.current?.value)}>Sign In</button>
    <button onClick={()=>signUpUserWithEmailAndPassword(emailRef.current?.value,passwordRef.current?.value)}>Sign Up</button>
    </>}
    {!user && <button onClick={signInUserWithGooglePopup}>Connect With Google</button>}
    {user && <button onClick={signOutUser}>Sign Out</button>}
    </div>
  )
}