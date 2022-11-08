import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {search} = req.query;
  if (search) res.status(200).json(searchProducts(search));
  res.status(200).json(products);
}

export const searchProducts = (input:any) => {
  return products.filter(product=>product.title.toLowerCase().includes(input.trim().toLowerCase()));
 }