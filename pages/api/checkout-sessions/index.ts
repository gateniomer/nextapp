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
  if(req.headers.origin!==process.env.NEXT_PUBLIC_URL) res.status(405).end("Method Not Allowed");

  const products:Item[] = req.body.items ? await Promise.all(req.body.items.map(async (item:Item) => {
    // const product = await (await fetch('https://api.escuelajs.co/api/v1/products/'+item.id)).json();
    const product = getProduct(item.id);
    if (!product) return;
    return {
      price_data:{
        currency:'ils',
        unit_amount:product.price*100,
        product_data:{
          name:product.title,
        },
      },
      quantity:item.quantity
    };
  })) : [];

  let meta:Item = {};
  meta['uid']=req.body.user.uid;
  products.forEach((product,index) => {
    meta[index] = JSON.stringify(product)
  });

  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: products,
    payment_intent_data:{
      metadata:meta
    },
    success_url: `${req.headers.origin}/checkout/success`,
    cancel_url: `${req.headers.origin}/checkout?failed=true`,
  };
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);

  res.status(200).json(checkoutSession);
}
