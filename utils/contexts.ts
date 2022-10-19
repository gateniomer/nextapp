import { createContext,Dispatch } from "react";
import {ProductType} from './types';

export interface INIT_CART_TYPE {
  cartProducts:ProductType[],
  addToCart:(product: ProductType) => void
}
export const INIT_CART:INIT_CART_TYPE = {
  cartProducts:[],
  addToCart:()=>{}
}

export const CartContext = createContext(INIT_CART);