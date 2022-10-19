import { createContext,Dispatch } from "react";
import {ProductType} from './types';

export interface INIT_CART_TYPE {
  cartProducts:ProductType[],
  addToCart:(product: ProductType) => void,
  updateCart:(products:ProductType[])=>void
}
export const INIT_CART:INIT_CART_TYPE = {
  cartProducts:[],
  addToCart:()=>{},
  updateCart:()=>{}
}

export const CartContext = createContext(INIT_CART);

export const userContext = createContext({});