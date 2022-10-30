import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {ProductType} from './types';

interface productsState {
  products:ProductType[]
}
const initialState:productsState = {
  products:[]
}
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, action:PayloadAction<ProductType[]>) => {
      state.products = action.payload
    },
  },
})

export const {updateProducts} = productsSlice.actions;

export default productsSlice.reducer;