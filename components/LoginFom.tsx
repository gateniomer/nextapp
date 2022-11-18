import {useRef} from 'react';
import { useAppSelector } from '../utils/hooks';
import { 
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
  signInUserWithGooglePopup,
  signOutUser } from '../utils/firebase';

export const LoginForm = () => {
  const user = useAppSelector((state)=>state.userDetails.user);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2>Please Sign In</h2>
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

export default LoginForm;