import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
// import { INIT_CART } from '../utils/contexts'
import { CartContext } from '../utils/contexts'
import { useState } from 'react'
import { ProductType } from '../utils/types'


function MyApp({ Component, pageProps }: AppProps) {

  const [cartProducts,setCartProducts] = useState<ProductType[]>([]);
  const addToCart = (productToAdd:ProductType) => {
    setCartProducts(prev=>{
      let isExist = -1;
      prev.forEach((product,index)=>{
        if(product.id===productToAdd.id) isExist = index;
      })
      if(isExist != -1){
        const updatedProduct = {...productToAdd,quantity:prev[isExist].quantity+1};
        prev.splice(isExist,1)
        return [updatedProduct,...prev];
      }else{
        return [{...productToAdd,quantity:1},...prev];
      }
    })
  }
  const updateCart = (products:ProductType[])=>{
    setCartProducts(products);
  }
  return (
  <CartContext.Provider value={{cartProducts,addToCart,updateCart}}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </CartContext.Provider>
  )
}

export default MyApp
