import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';

// type APIQuery = {
//   search?:string | undefined,
//   category?:number,
//   limit?:number,
//   ignore?:number | number[]
// }

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {search,category,limit,ignore} = req.query;
  return res.status(200).json(searchProductsByQuery({search,category,limit,ignore}));
}

export const searchProductsByQuery = (anotherConditions?:any) => {
  //destructure conditions
  const {search,category,limit,ignore} = anotherConditions;
  //count number of filteredItems
  let counter=0;

  return products.filter((product)=>{
    //if items exceeds limit (if exists)
    if((limit && counter >= limit)|| 
    (ignore && ignore.includes(product.id)))
     return false;
    //item is valid by default
    let isValid = true;

    //checks if item has search input
    if(search) isValid = isValid && product.title.toLowerCase().includes(search.trim().toLowerCase());
    //checks if item is in category
    if(typeof category !== "undefined") isValid = isValid && (product.category.id === parseInt(category));
    //if valid item, then count it.
    isValid && counter++;

    return isValid;
  });
 }