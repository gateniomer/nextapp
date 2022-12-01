import { useState,useRef,useEffect } from 'react';
import styles from '../styles/Menu.module.css';
import { useAppSelector } from "../utils/hooks";
import Link from 'next/link';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { useRouter } from 'next/router';
import { CATEGORIES } from '../data/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag,faXmark,faBurger, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Search from './search';
import { signOutUser } from '../utils/firebase';
import CartList from './CartList';

export const Menu = () => {
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
    <div className={styles.menuIcon} onClick={()=>setOpened(prev=>!prev)}>
      <FontAwesomeIcon className='only-on-mobile' icon={faBurger}/>
      <FontAwesomeIcon className='only-on-desktop' icon={faShoppingBag}/>
      <span>{numOfItems}</span>
    </div>

    {opened && 
    <div className={styles.container}>

      {/* Top Bar */}
      <div className={styles.topBar}>
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
      <div className={styles.categoriesContainer}>
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
      </div>

      <CartList closeCallback={setOpened}/>

  </div>}
  </div>)
}

export default Menu;