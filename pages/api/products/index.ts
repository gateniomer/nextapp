import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {search,category} = req.query;
  return res.status(200).json(searchProductsByQuery({search,category}));
}

export const searchProductsByQuery = (anotherConditions?:any) => {
  return products.filter(product=>{

    const {search,category} = anotherConditions;
    let isValid = true;

    if(search) isValid = isValid && product.title.toLowerCase().includes(search.trim().toLowerCase());
    if(category) isValid = isValid && (product.category.id === parseInt(category));

    return isValid;
  });
 }