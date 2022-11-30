import { useRouter } from "next/router";
import { useAppSelector } from "../../utils/hooks";
import {useEffect,useState} from 'react';
import styles from '../../styles/Checkout.module.css';
import Image from "next/image";
import { GetStaticProps } from "next";

export const getStaticProps:GetStaticProps = async () => {
  return {
    props:{title:'Checkout'}
  }
}
const Checkout = ()=>{
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const router = useRouter();
  const {failed} = router.query;
  const user = useAppSelector(state=>state.userDetails.user);
  const [loading,setLoading] = useState(false);

  const total = cartProducts.reduce((acc,product)=>product.price*product.quantity+acc,0);

  //sending request to 'checkout-sessions' endpoint which return stripe's payment intent
  const onClickHandler = async () => {
    setLoading(true);
    const resp = await fetch('/api/checkout-sessions',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({items:cartProducts,user})
    }).catch(e=>console.log(e));

    const data = resp && await resp.json();

    router.push(data.url); 
  }
  return (
    <div className={styles.container}>
    {failed && 
    <div className={styles.failedAlert}>
      <span><strong>Error:</strong> Purchase failed to complete, please try again.</span>
    </div>}
    <h2>Proceed to Payment</h2>
    
    <div className={styles.detailsContainer}>
      <div className={styles.checkoutItemsContainer}>
      {
        cartProducts.map((product,index)=>{
          return <div key={index} className={styles.checkoutItem}>
            <div className={styles.imageContainer}>
              <Image src={product.image}  layout={'fill'} objectFit="cover" />
            </div>
            <div className={styles.textContainer}>
              <span>{product.title} x{product.quantity}</span>
              <span>Size: {product.size}</span>
              <span>Price: {product.price} x {product.quantity} = {product.price*product.quantity}₪</span>
            </div>
          </div>
        })
      }
      </div>
      <div className={styles.stripeContainer}>
        <h3>Order Summary</h3>
        <span>Items: {total}₪</span>
        <span>Shipping & handling: 0₪</span>
        <span className={styles.totalPrice}>Order Total: <strong>{total}₪</strong></span>
        {user && <button className={`btn ${styles.btnStripe}`} onClick={onClickHandler}>{loading? 'Loading...' : 'Pay with Stripe'}</button>}
        <p>Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.</p>
        <div className={styles.stripeBudgetContainer}>
          <Image src={'/stripe.svg'} layout={'fill'} objectFit={'contain'}/>
        </div>
      </div>
    </div>
    </div>)
}

export default Checkout;