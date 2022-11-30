import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { User } from 'firebase/auth'
import { updateUserCartInFirestore } from "./firebase";
import { Product } from "./types";
import {addProductToCartThunk} from './thunk';

interface userState {
  user: User | undefined | null,
  cart: Product[]
}

const initialState:userState = {
  user:null,
  cart:[]
}



export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateUser: (state, action:PayloadAction<string|undefined>) => {
      state.user = action.payload ? JSON.parse(action.payload) : undefined;
    },
    updateCart: (state, action:PayloadAction<Product[]>) => {
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
    builder.addCase(addProductToCartThunk.fulfilled,(state,action)=>{
      state.cart = action.payload;
    });
    builder.addCase(addProductToCartThunk.rejected,(state,error)=>{
      console.log('error',error.error)
    })
  }
})

export const {updateUser,updateCart} = userSlice.actions;

export default userSlice.reducer;