import Link from "next/link"
import Cart from "./Cart"
import { useEffect,useState } from "react"
import { signOutUser, updateUserLoginInFirestore} from "../utils/firebase"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { onAuthStateChanged } from "firebase/auth"
import { auth,getUserData } from "../utils/firebase"
import { updateUser,updateCart } from "../utils/user.slice"
import Head from "next/head"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup,faRightFromBracket,faRightToBracket } from "@fortawesome/free-solid-svg-icons"

import Search from "./search"

type Category = {
  id:number,
  name:string,
  image?:string,
}

export default function Header () {
  const [categories,setCategories] = useState<Category[]>([]);
  const user = useAppSelector(state=>state.userDetails.user);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_URL+'/api/categories')
    .then(resp=>resp.json())
    .then(categories=>setCategories(categories))
    .catch(e=>console.log(e))
  },[])

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
  <header>
    <Link href={'/'}><h1>🛍️ Next E-Store</h1></Link>
    <nav>
      {categories.map(category=>
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
      <div style={{display:'flex',gap:'20px',fontSize:'1.1rem',cursor:'pointer'}}>
        <Cart/>
        <Link href={'/auth'}><FontAwesomeIcon icon={faUserGroup}/></Link>
        <FontAwesomeIcon icon={faRightFromBracket} onClick={signOutUser}/>
        {/* <button onClick={signOutUser}>Sign Out</button> */}
      </div>
    }
    </header>
  ) 
}