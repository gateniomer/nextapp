import { useContext } from "react";
import { CartContext } from "../utils/contexts";
import { useRouter } from "next/router";

const test = async () =>{
  // const resps = await Promise.all([fetch('https://fakestoreapi.com/products/'+1),fetch('https://fakestoreapi.com/products/'+2)]).then();
  // console.log(resps);
  // const urls = ['https://fakestoreapi.com/products/1','https://fakestoreapi.com/products/2'];
  // const products = await Promise.all(urls.map(async url => {
  //   const product = await (await fetch(url)).json();
  //   return {
  //     name:product.title,
  //     price:product.price*100,
  //     currency:'usd',
  //     quantity:1
  //   };
  // }));
  // console.log(products);
}
const Checkout = ()=>{
  const {cartProducts} = useContext(CartContext);
  const router = useRouter();
  test();
  
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
      {cartProducts.length === 0 && (<>
        <h2>Cart Is Empty!</h2>
      </>)}
    </div>
  )
}

export default Checkout;