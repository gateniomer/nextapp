import Stripe from "stripe";
const admin = require("firebase-admin");
const {initializeApp,getApps} = require("firebase-admin/app");

//disable body parser (need raw body cus of Stripe)
export const config = {
  api: {
    bodyParser: false,
  },
};

//convert request body to Buffer (need raw body cus of Stripe)
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const handler = async (req, res) => {
  console.log('testing');
  if (req.method === "POST") {
    const stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: "2022-11-15",
    });

    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK;
    console.log('buf',buf);
    let event;
    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    console.log('event',event);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const checkoutSession = event.data.object;

        const uid = checkoutSession.metadata.uid;

        await stripe.checkout.sessions.listLineItems(
          event.data.object.id,
          {
            limit:100,
            expand: ['data.price.product'],
          },
          async function(err, lineItems) {
            // asynchronously called
            if(err) console.log(err);
            console.log('testing3');
            if(lineItems){
              console.log('testing4');
              const products = lineItems.data.map((item,index)=>{
                return{
                  name:item.description,
                  price:item.amount_total/100,
                  currency:item.currency,
                  quantity:item.quantity
                }
              })
              console.log('lineitems',products);
              await handleCheckoutSession(uid,products);
            }
          }
        );
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

const handleCheckoutSession = async (uid,products)=>{
  if(!uid) return console.log("uid",uid);
  console.log('test');
  var serviceAccount = await JSON.parse(process.env.FIREBASE_ADMIN_SDK);

  //initialize firebase-admin app if there isn't any
  if (getApps().length < 1) {
    initializeApp(
    {
      credential: admin.credential.cert(serviceAccount)
    });
  }

  //add user to firebase-admin app, so firewall can detect the user in the request
  let user;
  try{
    user = await admin.auth().getUser(uid);
  }catch(error){
    console.log(error);
  }
  
  //if user exist, add the products from cart as new order & clean cart.
  try{
    if(user){
      const doc = admin.firestore().collection('users').doc(uid);
      const docData = (await doc.get()).data();
      console.log(user);
      if(docData.orders){
        await doc.set({...docData,orders:[{id:docData.orders.length,products},...docData.orders],products:[]});
      }else{
        await doc.set({...docData,orders:[{id:0,products}],products:[]});
      }
    }
  }catch(error){
    console.log(error);
  }
  
}
export default handler;