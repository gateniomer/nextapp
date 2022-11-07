import { useRouter } from "next/router";
import { useAppSelector } from "../utils/hooks";
import {useEffect} from 'react';

const Checkout = ()=>{
  const cartProducts = useAppSelector(state=>state.userDetails.cart);
  const router = useRouter();
  const user = useAppSelector(state=>state.userDetails.user);
  
  useEffect(()=>{
    if(!user) router.replace('/signin');
  },[user])
  const onClickHandler = async () => {

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
    cartProducts && cartProducts.length!=0 ?
      <div>
      <h1>Checkout Page</h1>
      {cartProducts.length!=0 && (<>
        <h2>Cart Items:</h2>
      {cartProducts.map(product=>(
        <div key={product.id}>
          <span>{product.title}</span>
          <span>{product.price}</span>
        </div>
      ))}
      <button onClick={onClickHandler}>Pay Now</button>
      </>)}
    </div>
    :
    <div>
      <h2>Cart Is Empty!</h2>
    </div>
  )
}

export default Checkout;