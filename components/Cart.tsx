import { useEffect, useState } from "react"
import { ProductType } from "../utils/types";
import { useContext } from "react";
import { CartContext } from "../utils/contexts";
import styles from '../styles/Cart.module.css';
import { onAuthStateChanged, User } from "firebase/auth";
import { addItemToCart,auth,getUserData } from "../utils/firebase";

export const Cart = () => {
  const {cartProducts,updateCart} = useContext(CartContext);
  const [user,setUser] = useState<User|undefined>();
  const numOfItems = cartProducts?.reduce((prev,current)=>prev+current.quantity,0);
  const totalPrice = cartProducts?.reduce((prev,current)=>prev+(Math.floor(current.price*current.quantity)),0);

  useEffect(()=>{
    //Detect if user is signed In
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('[Auth State] Detected Signed In User!');
        setUser(user);
        getUserData(user)
        .then(data=>data && updateCart(data.products))
        .catch(error=>console.log('[CART]: No Doc Found'));
        
      } else {
        // User is signed out
        setUser(undefined);
        console.log('[Auth State] No Signed In User Detected.');
      }
    });
  },[])
  useEffect(()=>{
    user && addItemToCart(user,cartProducts);
  },[cartProducts]);

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