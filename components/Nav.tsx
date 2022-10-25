import Link from "next/link"
import Cart from "./Cart"
import { useRef, useContext } from "react"
import { UserContext } from "../utils/contexts"
import { signInUserWithEmailAndPassword, signInUserWithGooglePopup,signOutUser,signUpUserWithEmailAndPassword } from "../utils/firebase"

export default function Nav () {
  const {user} = useContext(UserContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
  <div>
    <Link href={'/'}>Home</Link>
    <Cart />
    {!user && <>
    <input type="email" ref={emailRef}/>
    <input type="password" ref={passwordRef}/>
    <button onClick={()=>signInUserWithEmailAndPassword(emailRef.current?.value,passwordRef.current?.value)}>Sign In</button>
    <button onClick={()=>signUpUserWithEmailAndPassword(emailRef.current?.value,passwordRef.current?.value)}>Sign Up</button>
    </>}
    {!user && <button onClick={signInUserWithGooglePopup}>Connect With Google</button>}
    {user && <button onClick={signOutUser}>Sign Out</button>}
    {user && <Link href={'/checkout'}>Checkout</Link>}
    </div>
  )
}