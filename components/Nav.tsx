import Link from "next/link"
import Cart from "./Cart"
import { useRef,useEffect } from "react"
import { signInUserWithEmailAndPassword, signInUserWithGooglePopup,signOutUser,signUpUserWithEmailAndPassword } from "../utils/firebase"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { onAuthStateChanged } from "firebase/auth"
import { auth,getUserData } from "../utils/firebase"
import { updateUser,updateCart } from "../utils/user.slice"
import Search from "./search"

export default function Nav () {
  const user = useAppSelector(state=>state.userDetails.user);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('[Auth State] Detected Signed In User!');
        //get user data then set user & cart state
        getUserData(user)
        .then(data=>{
          dispatch(updateUser(JSON.stringify(user)));
          data && dispatch(updateCart(data.products));
        })
        .catch(error=>console.log('No User Doc Found',error));
      } else {
        // User is signed out
        console.log('[Auth State] No Signed In User Detected.');
        //empty user & cart state
        dispatch(updateUser(undefined));
        dispatch(updateCart([]));
      }
    });
  },[])
  
  return (
  <header>
    <Link href={'/'}><h1>Next E-Store</h1></Link>
    <Search/>
    {/* <nav>
      <Link href={'/'}>Home</Link>
    </nav> */}
    {!user && 
      <div>
        <Link href={'/signin'}>Sign In</Link>
      </div>
    }
    {user &&
      <div style={{display:'flex'}}>
        <Cart />
        <Link href={'/profile'}>Profile</Link>
        <button onClick={signOutUser}>Sign Out</button>
      </div>
    }
    </header>
  ) 
}