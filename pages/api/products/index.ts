import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {search} = req.query;
  console.log('search',search);
  if (search) res.status(200).json(JSON.stringify(searchProducts(search)));
  res.status(200).json(JSON.stringify(products));
}

export const searchProducts = (input:any) => {
  return products.filter(product=>product.title.toLowerCase().includes(input.trim().toLowerCase()));
 }