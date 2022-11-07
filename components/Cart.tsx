import { useState,useRef,useEffect } from 'react';
import styles from '../styles/Cart.module.css';
import { useAppSelector } from "../utils/hooks";
import Link from 'next/link';
import useOutsideAlerter from '../hooks/useOutsideAlerter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

export const Cart = () => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const [opened,setOpened] = useState(false);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts?.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);

  const ref = useRef(null);
  const [clickedOutside] = useOutsideAlerter(ref);
  useEffect(()=>{setOpened(false)},[clickedOutside]);

  return (
    <div className={styles.cart} ref={ref}>
    <div onClick={()=>setOpened(prev=>!prev)}>
      <FontAwesomeIcon icon={faCartShopping}/>
      <span>{numOfItems}</span>
    </div>
    {/* <button onClick={()=>setOpened(prev=>!prev)}>Cart ({numOfItems})</button> */}
    {opened && 
    <div className={styles.container} onClick={()=>setOpened(false)}>
      <h2>Products:</h2>
      {cartProducts && cartProducts.map(product => 
      <Link key={product.id} href={'/products/'+product.id}>
        <div className={styles.cartItem}>
          <img src={product.image} alt={product.title} />
          <span className={styles.cartItemTitle}>{product.title}: {Math.floor(product.price * product.quantity)}$</span>
          <span className={styles.cartItemQuantity}>{product.quantity}</span>
        </div>
      </Link>
    )}
    <Link href={'/checkout'}>Checkout</Link>
  </div>}
  </div>)
}

export default Cart;