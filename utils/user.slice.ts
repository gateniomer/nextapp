import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { User } from 'firebase/auth'
import { updateUserCartInFirestore } from "./firebase";
import { ProductType } from "./types";
import {updateCartThunk} from './thunk';

interface userState {
  user: User | undefined,
  cart: ProductType[]
}

const initialState:userState = {
  user:undefined,
  cart:[]
}



export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateUser: (state, action:PayloadAction<string|undefined>) => {
      state.user = action.payload ? JSON.parse(action.payload) : undefined;
    },
    updateCart: (state, action:PayloadAction<ProductType[]>) => {
      state.cart = action.payload
    },
    // addItemToCart:(state,action:PayloadAction<ProductType>) =>{
    //   let isExist = -1;
    //   const oldCard = state.cart;

    //   oldCard.forEach((product,index)=>{
    //     if(product.id===action.payload.id) isExist = index;
    //   })
    //   if(isExist != -1){
    //     const updatedProduct = {...action.payload,quantity:oldCard[isExist].quantity+1};
    //     oldCard.splice(isExist,1)
    //     state.cart = [updatedProduct,...oldCard];
    //   }else{
    //     state.cart = [{...action.payload,quantity:1},...oldCard];
    //   }
    // }
  },
  extraReducers:builder=>{
    builder.addCase(updateCartThunk.fulfilled,(state,action)=>{
      state.cart = action.payload;
    });
    builder.addCase(updateCartThunk.rejected,(state,error)=>{
      console.log('error',error.error)
    })
  }
})

export const {updateUser,updateCart} = userSlice.actions;

export default userSlice.reducer;