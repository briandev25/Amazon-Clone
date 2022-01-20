const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('//Secret Key from Stripe');

//API

//App Configs
 const app = express();

//Middlewares
app.use(cors({origin:true}));
app.use(express.json());

//API Routes

app.get('/', (req,res) =>{
    res.status(200).send('<h1>Hello World</h1>')
});

app.post('/payments/create', async(req,res) => {
    const total =  req.query.total;
    console.log("Payment received BOOOM!!! :", total);
    const paymentIntent = await stripe.paymentIntents.create({
          amount:total,
          currency:"usd"
    });
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
});
exports.api = functions.https.onRequest(app);

