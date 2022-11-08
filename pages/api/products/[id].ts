import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {id} = req.query;
  const product = getProduct(id);
  product ? res.status(200).json(product) : res.status(400).json({error:'product not found'});
}

export const getProduct = (id:any)=>{
  return products.find(product=>product.id=== parseInt(id));
}