import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { User } from 'firebase/auth'
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