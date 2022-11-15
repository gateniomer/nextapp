import { AppDispatch } from "./store";
import { updateUserCartInFirestore } from "./firebase";
import { ProductType } from "./types";
import {createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from "./store";

type Props = {
  product:ProductType,
  subtruct?:boolean,
  quantity?:number,
}
type ThunkApi = {
  state:RootState
}
export const updateCartThunk = createAsyncThunk
<any,Props,ThunkApi>
('updateCartThunk',async (props,thunkApi)=>{
  const {product,subtruct,quantity} = props;
  const state = thunkApi.getState();
  let isExist = -1;
  const oldCart = state.userDetails.cart ? [...state.userDetails.cart]: [];
  let newCart;
  oldCart.forEach((item:ProductType,index)=>{
    if((product.id===item.id ) && (product.size===item.size)) isExist = index;
  })
  
  
  const quantityToAdd = quantity ? quantity : 1;
  if(isExist != -1){
    const updatedProduct:ProductType = {
      ...product,
      quantity:subtruct ? oldCart[isExist].quantity-1:oldCart[isExist].quantity+quantityToAdd
    };
    oldCart.splice(isExist,1);
    if(updatedProduct.quantity>0){
      newCart = [updatedProduct,...oldCart];
    }else{
      newCart = [...oldCart];
    }
  }else{
    newCart = [{...product,quantity:quantityToAdd},...oldCart];
  }
  state.userDetails.user && await updateUserCartInFirestore(state.userDetails.user,newCart);
  console.log(newCart);
  return newCart;
})