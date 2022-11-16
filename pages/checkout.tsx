import { useRouter } from "next/router";
import { useAppSelector } from "../utils/hooks";
import {useEffect,useState} from 'react';
import styles from '../styles/Checkout.module.css';

const Checkout = ()=>{
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const router = useRouter();
  const user = useAppSelector(state=>state.userDetails.user);
  const [loading,setLoading] = useState(false);
  
  //redirect user if not signed-in
  // useEffect(()=>{
  //   if(!user) router.replace('/signin');
  // },[user])

  //sending request to 'checkout-sessions' endpoint which return stripe's payment intent
  const onClickHandler = async () => {
    setLoading(true);
    const resp = await fetch('/api/checkout-sessions',{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({items:cartProducts})
    }).catch(e=>console.log(e));

    const data = resp && await resp.json();
    
    router.push(data.url); 
  }
  return (
    <div className={styles.container}>
    <h2>Proceed to Payment</h2>
    <p>Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.</p>
    <div className={styles.detailsContainer}>
      <div className={styles.checkoutItemsContainer}>
      {
        cartProducts.map((product,index)=>{
          return <div key={index} className={styles.checkoutItem}>
            
            <span>{product.title} x{product.quantity}</span>
            <span>Size: {product.size}</span>
            <span>Price: {product.price} x {product.quantity} = {product.price*product.quantity}₪</span>
          </div>
        })
      }
      </div>
      <div>
        {user && <button className="btn" onClick={onClickHandler}>{loading? 'Loading...' : 'Buy Now'}</button>}
      </div>
    </div>
    </div>)
}

export default Checkout;