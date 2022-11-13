import { AppDispatch } from "./store";
import { updateUserCartInFirestore } from "./firebase";
import { ProductType } from "./types";
import {createAsyncThunk} from '@reduxjs/toolkit';
import { RootState } from "./store";

type Props = {
  item:ProductType,
  subtruct?:boolean,
  quantity?:number
}
type ThunkApi = {
  state:RootState
}
export const updateCartThunk = createAsyncThunk
<any,Props,ThunkApi>
('updateCartThunk',async (props,thunkApi)=>{
  const {item,subtruct,quantity} = props;
  const state = thunkApi.getState();
  let isExist = -1;
  const oldCart = state.userDetails.cart ? [...state.userDetails.cart]: [];
  let newCart;
  oldCart.forEach((product,index)=>{
    if(product.id===item.id) isExist = index;
  })
  
  const quantityToAdd = quantity ? quantity : 1;
  if(isExist != -1){
    const updatedProduct:ProductType = {
      ...item,
      quantity:subtruct ? oldCart[isExist].quantity-1:oldCart[isExist].quantity+quantityToAdd
    };
    oldCart.splice(isExist,1);
    if(updatedProduct.quantity>0){
      newCart = [updatedProduct,...oldCart];
    }else{
      newCart = [...oldCart];
    }
  }else{
    newCart = [{...item,quantity:quantityToAdd},...oldCart];
  }
  state.userDetails.user && await updateUserCartInFirestore(state.userDetails.user,newCart);
  return newCart;
})