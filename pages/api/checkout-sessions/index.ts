import Stripe from "stripe";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
type Item = {
  [key:string]:any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await Promise.all(req.body.items.map(async (item:Item) => {
    const product = await (await fetch('https://api.escuelajs.co/api/v1/products/'+item.id)).json();
    return {
      name:product.title,
      amount:product.price*100,
      currency:'usd',
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
