import { useState,useRef,useEffect } from 'react';
import styles from '../styles/MobileMenu.module.css';
import { useAppSelector } from "../utils/hooks";
import Link from 'next/link';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { useRouter } from 'next/router';
import { CATEGORIES } from '../data/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark,faBurger, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Search from './search';
import { signOutUser } from '../utils/firebase';
import CartList from './CartList';

export const MobileMenu = () => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const [opened,setOpened] = useState(false);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const user = useAppSelector(state=>state.userDetails.user);

  const router = useRouter();

  const ref = useRef(null);
  const [clickedOutside] = useOutsideAlerter(ref);
  useEffect(()=>{setOpened(false)},[clickedOutside]);


  return (
    <div ref={ref}>
    <div className={styles.button} onClick={()=>setOpened(prev=>!prev)}>
      <FontAwesomeIcon icon={faBurger}/>
      <span>{numOfItems}</span>
    </div>

    {opened && 
    <div className={styles.container}>

      {/* Top Bar */}
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={faXmark} className={styles.closeButton} onClick={()=>setOpened(false)}/>
          <div className={styles.userDetailsContainer}>
            <div onClick={()=>{
            setOpened(false);
            router.push('/auth');
          }} style={{display:'flex',gap:'10px'}}>
            <span>{user ? user.email : 'Sign In'}</span>
            <FontAwesomeIcon icon={faUser} className={styles.closeButton} onClick={()=>setOpened(false)}/>
            </div>
            {user && <FontAwesomeIcon icon={faRightFromBracket} onClick={()=>signOutUser()}/>}
          </div>
      </div>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <Search callback={()=>{setOpened(false)}}/>
      </div>

      {/* Categories */}
      <h2>Browse Categories</h2>
      <nav>
        <ul>
          {Object.values(CATEGORIES).map(category=>
          <li onClick={()=>setOpened(false)} key={category.id}>
            <Link key={category.id} href={'/categories/'+category.id}>{category.name}</Link>
          </li>
          )}
        </ul>
      </nav>

      <CartList closeCallback={setOpened}/>

  </div>}
  </div>)
}

export default MobileMenu;