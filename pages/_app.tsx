import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { CartContext,UserContext } from '../utils/contexts'
import { useEffect, useState } from 'react'
import { ProductType } from '../utils/types'
import { User,onAuthStateChanged } from 'firebase/auth'
import { auth,getUserData,updateUserCartInFirestore } from '../utils/firebase'


function MyApp({ Component, pageProps }: AppProps) {

  const [cartProducts,setCartProducts] = useState<ProductType[]>([]);
  const [user,setUser] = useState<User|undefined>();

  //when user auth state changes listener
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('[Auth State] Detected Signed In User!');
        //get user data then set user & cart state
        getUserData(user)
        .then(data=>{
          setUser(user);
          data && setCartProducts(data.products);
        })
        .catch(error=>console.log('No User Doc Found',error));
      } else {
        // User is signed out
        console.log('[Auth State] No Signed In User Detected.');
        //empty user & cart state
        setUser(undefined);
        setCartProducts([]);
      }
    });
  },[])

  //update user's doc in firestore each time cart is changed
  useEffect(()=>{
    user && updateUserCartInFirestore(user,cartProducts);
  },[cartProducts]);

  //add item to cart state
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

  return (
    <UserContext.Provider value={{user}}>
      <CartContext.Provider value={{cartProducts,addToCart}}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContext.Provider>
  </UserContext.Provider>
  )
}

export default MyApp
