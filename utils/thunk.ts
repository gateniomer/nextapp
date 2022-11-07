import { AppDispatch } from "./store";
import { updateUserCartInFirestore } from "./firebase";
import { ProductType } from "./types";
import {createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from "./store";

export const updateCartThunk = createAsyncThunk<any,ProductType,{state:RootState}>('updateCartThunk',async (item:ProductType,{getState})=>{
  const state = getState();
  let isExist = -1;
  const oldCart = state.userDetails.cart ? [...state.userDetails.cart]: [];
  let newCart;
  oldCart.forEach((product,index)=>{
    if(product.id===item.id) isExist = index;
  })
  if(isExist != -1){
    const updatedProduct = {...item,quantity:oldCart[isExist].quantity+1};
    oldCart.splice(isExist,1);
    newCart = [updatedProduct,...oldCart];
  }else{
    newCart = [{...item,quantity:1},...oldCart];
  }
  state.userDetails.user && await updateUserCartInFirestore(state.userDetails.user,newCart);
  return newCart;
})