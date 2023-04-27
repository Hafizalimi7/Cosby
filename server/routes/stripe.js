const express = require('express');
const Stripe = require('stripe');
const { Order } = require('../models/order');
require("dotenv").config();
const stripe =  Stripe(process.env.STRIPE_KEY)

const router = express.Router();


//Stripe webhook
let webhookSecret = process.env.WEBHOOK_SECRET;

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    //Retrieve the event by verifying the signature using the raw body and secret.
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  }
  catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }


    // Handle the checkout.session.completed event
    if(event === "checkout.session.completed"){ //peform a check to see if checkout point is complete
      stripe.customers
      .retrieve(data.customer)//id of customer
      .then((customer) => {
        createOrder(customer, data)//creating an order using the customer from the data i get from stripe
        }).catch(err => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end;
});


router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata:{
      userId: req.body.userId,//user ID
      cart: JSON.stringify(req.body.cartItems)//items in the cart
    }
  })
 
  const line_items = req.body.cartItems.map(item => {
    return{
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata:{
            id: item.id
          }
        },
        unit_amount: item.price * 100
      },
      quantity: item.cartQuantity,
    }
  })
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types : ['card'],
    shipping_address_collection: {allowed_countries: ['GB', 'US', 'CA']},
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 0, currency: 'usd'},
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },
    {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 1500, currency: 'usd'},
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 1},
            maximum: {unit: 'business_day', value: 1},
          },
        },
      },
    ],
    phone_number_collection: {
      enabled : true
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: "http://localhost:3000/cart",
  });

  res.send({url: session.url});
});

// Create Order
const createOrder = async(customer, data) => {
  const Items = JSON.parse(customer.metadata.cart)// this will give cartItems

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: Items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try{
   const saveOrder = await newOrder.save()//save oder to db

   console.log("Processed Order:", saveOrder)
   // could possibly send an email to customer to say say order has been completed
  }catch(err){
    console.log(err)
  }
}

module.exports = router;