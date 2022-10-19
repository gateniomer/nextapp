import { useState } from "react"
import { ProductType } from "../utils/types";
import { useContext } from "react";
import { CartContext } from "../utils/contexts";
import styles from '../styles/Cart.module.css';

export const Cart = () => {
  const {cartProducts} = useContext(CartContext);
  const numOfItems = cartProducts.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);
  return (
    <>
    <h4>Cart ({numOfItems}) Total: {totalPrice}$</h4>
  <div className={styles.container}>
    {cartProducts && cartProducts.map(product => 
    <div key={product.id} className={styles.cartItem}>
      <img src={product.image} alt={product.title} />
      <span className={styles.cartItemTitle}>{product.title}: {Math.floor(product.price * product.quantity)}$</span>
      <span className={styles.cartItemQuantity}>{product.quantity}</span>
    </div>
    )}
  </div>
  </>)
}

export default Cart;