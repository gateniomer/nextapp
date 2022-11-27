import { useState,useRef,useEffect } from 'react';
import styles from '../styles/Cart.module.css';
import { useAppSelector } from "../utils/hooks";
import Link from 'next/link';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../utils/hooks';
import { ProductType } from '../utils/types';
import { updateCartThunk } from '../utils/thunk';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faXmark } from "@fortawesome/free-solid-svg-icons"

export const Cart = () => {
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const [opened,setOpened] = useState(false);
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts?.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);

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
      <FontAwesomeIcon icon={faCartShopping}/>
      <span>{numOfItems}</span>
    </div>

    {opened && 
    <div className={styles.container}>
      <FontAwesomeIcon icon={faXmark} className={styles.closeButton} onClick={()=>setOpened(false)}/>
      <h2>Cart Items:</h2>
      <div className={styles.itemsContainer}>
      {cartProducts && cartProducts.map(product => 
        <div key={''+product.id+product.size} className={styles.cartItem}>
          <img src={product.image} alt={product.title} onClick={()=>navigateToProduct(product.id)}/>
          <div>
            <span className={styles.cartItemTitle}  onClick={()=>navigateToProduct(product.id)}>{product.title}</span>
            {product.size && <span className={styles.cartItemTotal}>Size: {product.size}</span>}
            <span className={styles.cartItemTotal}>Total: {Math.floor(product.price * product.quantity)}₪</span>
          </div>
          <button onClick={()=>subtractProductQuantity(product)}>-</button>
          <span className={styles.cartItemQuantity}>{product.quantity}</span>
          <button onClick={()=>addProductQuantity(product)}>+</button>
        </div>
    )}
    </div>
    <span>Cart Total: {totalPrice}₪</span>
    <button className={styles.checkoutButton} onClick={()=>{
      setOpened(false);
      router.push('/checkout')
    }}>Proceed to Checkout</button>
  </div>}
  </div>)
}

export default Cart;