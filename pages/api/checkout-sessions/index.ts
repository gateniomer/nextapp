import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from 'next';
import {getProduct} from '../../api/products/[id]'

type Item = {
  [key:string]:any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await Promise.all(req.body.items.map(async (item:Item) => {
    // const product = await (await fetch('https://api.escuelajs.co/api/v1/products/'+item.id)).json();
    const product = getProduct(item.id);
    if (!product) return;
    return {
      name:product.title,
      amount:product.price*100,
      currency:'ils',
      quantity:item.quantity
    };
  }));

  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: products,
    success_url: `${req.headers.origin}/checkout`,
    cancel_url: `${req.headers.origin}/checkout`,
  };
  
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);

  res.status(200).json(checkoutSession);
}
