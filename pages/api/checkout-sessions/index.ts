import Stripe from "stripe";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET);
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: req.body.items,
    success_url: `${req.headers.origin}/checkout`,
    cancel_url: `${req.headers.origin}/checkout`,
  };
  
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);

  res.status(200).json(checkoutSession);
  res.status(500).json(res);
}
