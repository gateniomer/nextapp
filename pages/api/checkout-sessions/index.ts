import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from 'next';
import {getProduct} from '../../api/products/[id]';

type Item = {
  [key:string]:any
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  
  if(req.headers.origin!==process.env.NEXT_PUBLIC_URL) res.status(405).end("Method Not Allowed");

  //array that contains additional product details (such as size,id,etc...)
  let productsDetails:object[] = [];

  const products:Item[] = req.body.items ? req.body.items.map((item:Item) => {
    //get product from server database
    const product = getProduct(item.id);
    if (!product) return;

    //add additional details if there is any
    productsDetails.push({
      id:item.id,
      size:item.size
    });

    //return the product as line item object by Stripe requirements
    return {
      price_data:{
        currency:'ils',
        unit_amount:product.price*100,
        product_data:{
          name:product.title,
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
    metadata:{productsDetails:JSON.stringify(productsDetails),uid:req.body.user.uid},
    success_url: `${req.headers.origin}/checkout/success`,
    cancel_url: `${req.headers.origin}/checkout?failed=true`,
  };

  //create checkout session and send it to user
  if(process.env.STRIPE_SECRET){
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: "2022-11-15",
    });
    const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create(params);
    res.status(200).json(checkoutSession);
  }
  
}
