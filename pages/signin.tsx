import {useRef,useEffect} from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../utils/hooks';
import { 
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
  signInUserWithGooglePopup,
  signOutUser } from '../utils/firebase';

const Signin = () => {
  const router = useRouter();
  const user = useAppSelector((state)=>state.userDetails.user);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(()=>{
    if(user) router.replace('/profile');
  },[user]);

  return !user && (
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

export default Signin;