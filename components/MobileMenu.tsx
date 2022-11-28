import { useState,useRef,useEffect } from 'react';
import styles from '../styles/MobileMenu.module.css';
import { useAppSelector } from "../utils/hooks";
import Link from 'next/link';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../utils/hooks';
import { ProductType } from '../utils/types';
import { updateCartThunk } from '../utils/thunk';
import { CATEGORIES } from '../data/categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faXmark,faBurger, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Search from './search';
import { signOutUser } from '../utils/firebase';

export const MobileMenu = () => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const [opened,setOpened] = useState(false);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts?.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);
  const user = useAppSelector(state=>state.userDetails.user);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const ref = useRef(null);
  const [clickedOutside] = useOutsideAlerter(ref);
  useEffect(()=>{setOpened(false)},[clickedOutside]);

  const addProductQuantity = (product:ProductType)=>{
    dispatch(updateCartThunk({product}));
  } 
  const subtractProductQuantity = (product:ProductType)=>{
    console.log(product);
    dispatch(updateCartThunk({product,subtruct:true}));
  } 

  const navigateToProduct = (id:number)=>{
    router.push('/products/'+id);
    setOpened(false);
  }
  return (
    <div ref={ref}>
    <div className={styles.button} onClick={()=>setOpened(prev=>!prev)}>
      <FontAwesomeIcon icon={faBurger}/>
      <span>{numOfItems}</span>
    </div>

    {opened && 
    <div className={styles.container}>
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

      <div className={styles.searchContainer}>
        <Search callback={()=>{setOpened(false)}}/>
      </div>
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
      {user && <>
        <h2>Cart Items</h2>
      <div className={styles.itemsContainer}>
      {cartProducts && cartProducts.map(product => 
        <div key={''+product.id+product.size} className={styles.cartItem}>
          <img src={product.image} alt={product.title} onClick={()=>navigateToProduct(product.id)}/>
          <div>
            <span className={styles.cartItemTitle}  onClick={()=>navigateToProduct(product.id)}>{product.title}</span>
            {product.size && <span className={styles.cartItemTotal}>Size: {product.size}</span>}
            <span className={styles.cartItemTotal}>Total: {Math.floor(product.price * product.quantity)}₪</span>
          </div>
          <button onClick={()=>subtractProductQuantity(product)} className={'btn'}>-</button>
          <span className={styles.cartItemQuantity}>{product.quantity}</span>
          <button onClick={()=>addProductQuantity(product)} className={'btn'}>+</button>
        </div>
    )}
    </div>
    {cartProducts.length > 0 ? <>
      <span className={styles.total}><strong>Cart Total: {totalPrice}₪</strong></span>
      <button className={styles.checkoutButton + ' btn'} onClick={()=>{
      setOpened(false);
      router.push('/checkout')
    }}>Proceed to Checkout</button>
    </> : <span>There are no items in cart</span>}
      </>}
  </div>}
  </div>)
}

export default MobileMenu;