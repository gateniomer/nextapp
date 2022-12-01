import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from 'next';
import {getProduct} from '../../api/products/[id]';
import { Product } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  type LineItem = {
    price_data:{
      currency:string,
      unit_amount:number,
      product_data:{
        name:string,
      }
    },
    quantity:number,
  }
  
  const products:LineItem[] = req.body.items ? req.body.items.map((item:Product) => {
    //get product from server database
    const product = getProduct(item.id);
    if (!product) return;

    //return the product as line item object by Stripe requirements
    return {
      price_data:{
        currency:'ils',
        unit_amount:product.price*100,
        product_data:{
          name:`${product.title} [${item.size}]`
        },
      },
      quantity:item.quantity,
    };
  }) : [];


  //checkout session params
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: products,
    metadata:{uid:req.body.user.uid,buynow:req.body.buynow},
    success_url: `${req.headers.origin}/checkout/success`,
    cancel_url: req.body.fallbackUrl ?
      `${req.body.fallbackUrl}?failed=true`:
      `${req.headers.origin}/checkout?failed=true`,
  };

  //create checkout session and send it to user
  if(process.env.STRIPE_SECRET){
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: "2022-11-15",
    });
    const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);

    res.status(200).send(checkoutSession);
  }
  
}
