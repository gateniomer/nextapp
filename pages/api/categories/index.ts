import { NextApiRequest, NextApiResponse } from "next";
import {CATEGORIES} from '../../../data/categories';

export default function handler(req:NextApiRequest,res:NextApiResponse) {
  res.status(200).json(Object.values(CATEGORIES));
}
