import Link from "next/link"
import DesktopCartMenu from "./DesktopCartMenu"
import { useEffect } from "react"
import { signOutUser, updateUserLoginInFirestore} from "../utils/firebase"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { onAuthStateChanged } from "firebase/auth"
import { auth,getUserData } from "../utils/firebase"
import { updateUser,updateCart } from "../utils/user.slice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup,faRightFromBracket,faRightToBracket,faBurger } from "@fortawesome/free-solid-svg-icons";
import {CATEGORIES} from '../data/categories';
import Search from "./search";
import MobileMenu from "./MobileMenu"


export default function Header () {

  const user = useAppSelector(state=>state.userDetails.user);
  const dispatch = useAppDispatch();


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('[Auth State] Detected Signed In User!');
        updateUserLoginInFirestore(user);
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
  <>
  <div className="space-filler-mobile"></div>
  <header>
    <Link href={'/'}><h1>🛍️ Next E-Store</h1></Link>
    <div className='header-desktop'>
      <nav>
        {Object.values(CATEGORIES).map(category=>
        <Link key={category.id} href={'/categories/'+category.id}>{category.name}</Link>
        )}
        
      </nav>
      <Search/>
      {!user && 
          <Link href={'/auth'}>
            <div>
              Sign In <FontAwesomeIcon icon={faRightToBracket}/>
            </div>
          </Link>
      }
      {user &&
        <div className='header-links-container'>
          <DesktopCartMenu/>
          <Link href={'/auth'}><FontAwesomeIcon icon={faUserGroup}/></Link>
          <FontAwesomeIcon icon={faRightFromBracket} onClick={signOutUser}/>
        </div>
      }
    </div>
    <div className='header-mobile'>
      <MobileMenu/>
    </div>
    </header>
  </>
  ) 
}