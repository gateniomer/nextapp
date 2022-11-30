import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';
import { dbProduct } from "../../../utils/types";
// type APIQuery = {
//   search?:string | undefined,
//   category?:number,
//   limit?:number,
//   ignore?:number | number[]
// }

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {search,category,limit,ignore,random} = req.query;
  return res.status(200).json(searchProductsByQuery({search,category,limit,ignore,random}));
}

export const searchProductsByQuery = (anotherConditions?:any) => {
  //destructure conditions
  const {search,category,limit,ignore,random} = anotherConditions;
  //count number of filteredItems
  let counter=0;
  //decide if products are random or not
  let productsArray:dbProduct[] = [...products];
  if(random && random === 'true') productsArray = randomArary(products);

  return productsArray.filter((product)=>{
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

 const randomArary = (orignalArray:dbProduct[]) => {
  let temp = [...orignalArray];
  let productsArray:dbProduct[] = [];

  while(temp.length>0){
    const random = Math.floor(Math.random()*temp.length);
      productsArray.push(temp[random]);
      temp.splice(random,1);
  }

  return productsArray;
}