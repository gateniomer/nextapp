import { NextApiRequest, NextApiResponse } from "next";
import {products,findProduct} from '../../../data/products';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {id} = req.query;
  const product = findProduct(id);
  product ? res.status(200).json(product) : res.status(400).json({error:'product not found'});
}