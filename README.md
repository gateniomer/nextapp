# Next E-Store Project
As part of my self-learning journey, I made a simple online store with NextJS, Redux, Firebase & Stripe. Written in TypeScript, with implementation of Webhooks, self made API and much more!.

I created this project using some of the knowledge I gained in:
- HTML, CSS ,JavaScript
- Typescript
- React & NextJS
- Redux
- Firebase/Firestore
- Stripe API
- REST API
- Webhooks
- CSS Modules
- Graphic Design
- Git & Github


## About this app
**This project was made as part of a challenge: learn from docs with no help from any tutorials/videos. I think it went alright! Please provide any feedback through linkedin.**

### Main Features:
- Choose between 40 items to buy (Tops, Trousers, Shoes, Accessories)
- Cart items & order history saved to the cloud, access them from anywhere! (firestore)
- Login/Signup with email or Google account. (firebase)
- Search for specific products through the search bar. (communicating with my own API)
- Enjoy lightning fast performance & loading speeds! (Thanks to Nextjs SSG/SSR)

### Interesting Technical Details:
- Thanks to NextJS, most of the pages are SSG, with some SSR.
- Site's Header component is listning for auth status from firebase, then dispatch an action to store the user's details in Redux.
- When adding item to cart, we dispatch an action, then have thunk middleware that deal with storing out new cart to Firebase.
- When user continue to stripe with he's cart items, the server make new array with the same items from the 'database' (based on the item's id & size in the request body). It is a safer approach in case the user manipulate the items in the request.
- When the payment is complete at Stripe servers, Stripe sends request to our webhook. Then, our webhook calling firestore to update the user's order history (with the information given in the request) & empty the user's cart.

.
.
.

I hope you enjoyed reading about this project, thank you for your time 😁

Live site: https://nextapp-gilt.vercel.app/

Github repo: https://github.com/gateniomer/nextapp

![showcase](./showcase.png)