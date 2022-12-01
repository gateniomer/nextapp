import { NextApiRequest, NextApiResponse } from "next";
import {products} from '../../../data/products';
import { dbProduct } from "../../../utils/types";

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {search,category,limit,ignore,random} = req.query;
  return res.status(200).json(searchProductsByQuery({search,category,limit,ignore,random}));
}

export const searchProductsByQuery = (anotherConditions?:any) => {
  //destructure conditions
  const {search,category,limit,ignore,random} = anotherConditions;
  //count number of filteredItems
  let validItemsAmount=0;
  //decide if products are random or not
  let productsArray:dbProduct[] = [...products];
  if(random && random === 'true') productsArray = randomArary(products);

  return productsArray.filter((product)=>{
    //if productsArray exceeds limit, do not add more items
    if((limit && validItemsAmount >= limit)|| 
    (ignore && ignore.includes(product.id)))
     return false;
    //item meets all conditions by default
    let isValid = true;

    //filter item if not met search condition
    if(search) isValid = isValid && product.title.toLowerCase().includes(search.trim().toLowerCase());
    //filter item if not on the same category
    if(typeof category !== "undefined") isValid = isValid && (product.category.id === parseInt(category));
    
    //if item met all condistions(isValid), then count it.
    isValid && validItemsAmount++;

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