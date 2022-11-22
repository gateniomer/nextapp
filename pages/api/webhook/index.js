import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});
const webhookSecret = process.env.STRIPE_WEBHOOK;

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const handler = async (req, res) => {
  console.log('test');
  if (req.method === "POST") {
    console.log('test');
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    console.log('test');
    let event;
    console.log('test');
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        handleIntent(paymentIntent);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

const handleIntent = async (paymentIntent)=>{
  const products = Object.entries(paymentIntent.metadata).filter(([key,value])=>key!=='uid').map(([key,value]) =>JSON.parse(value));


        var admin = require("firebase-admin");
        var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

        !admin.apps.length &&
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        }) 
        
        const user = await admin.auth().getUser(paymentIntent.metadata.uid);
        const doc = admin.firestore().collection('users').doc(user.uid);
        const docData = (await doc.get()).data();

        if(docData.orders){
          await doc.set({...docData,orders:[{id:docData.orders.length,products},...docData.orders],products:[]});
        }else{
          await doc.set({...docData,orders:[{id:0,products}],products:[]});
        }
}
export default handler;