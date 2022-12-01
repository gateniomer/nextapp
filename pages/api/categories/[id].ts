import { NextApiRequest, NextApiResponse } from "next";
import {CATEGORIES} from '../../../data/categories';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {id} = req.query;
  const category = getCategory(id);
  category ? 
  res.status(200).json(category) :
  res.status(400).json({error:"category not found"});
}

export const getCategory = (id:any) => {
  return Object.values(CATEGORIES).find(category=>category.id===parseInt(id));
}