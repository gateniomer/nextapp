import { NextApiRequest, NextApiResponse } from "next";
import {CATEGORIES} from '../../../data/categories';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  const {id} = req.query;
  const category = getCategory(id);
  res.status(200).json(category);
}

export const getCategory = (id:any) => {
  return Object.values(CATEGORIES).find(category=>category.id===parseInt(id));
}