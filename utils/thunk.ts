import { AppDispatch } from "./store";
import { updateUserCartInFirestore } from "./firebase";
import { ProductType } from "./types";
import {createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from "./store";


type ThunkApi = {
  state:RootState
}

export const addProductToCartThunk = createAsyncThunk
<any,ProductType,ThunkApi>
('updateCartThunk',async (product,thunkApi)=>{

  const state = thunkApi.getState();
  const oldCart = state.userDetails.cart ? [...state.userDetails.cart]: [];

  let isExist = false;
  //if product is in cart, update its quantity
  //also filter products with quantity less then 1
  const newCart = oldCart.map((item)=>{
    if((product.id===item.id ) && (product.size===item.size)){
      isExist = true;
      return  {
        ...item,
        quantity:item.quantity! + product.quantity!
      }
    }
    return item;
  }).filter(item=>item.quantity!>0);
  
  //if the product does not exist in cart, add it.
  if(!isExist) newCart.push(product);

  //update user cart in firestore then return new cart.
  state.userDetails.user && await updateUserCartInFirestore(state.userDetails.user,newCart);
  console.log(newCart);
  return newCart;
})