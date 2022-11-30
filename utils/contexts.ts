import { createContext,Dispatch } from "react";
import {Product} from './types';
import {User} from 'firebase/auth';

interface INIT_CART_TYPE {
  cartProducts:Product[],
  addToCart:(product: Product) => void
}
const INIT_CART:INIT_CART_TYPE = {
  cartProducts:[],
  addToCart:()=>{}
}
interface INIT_USER_TYPE{
  user:User|undefined
}
const INIT_USER:INIT_USER_TYPE = {
  user:undefined
}


export const CartContext = createContext(INIT_CART);

export const UserContext = createContext(INIT_USER);