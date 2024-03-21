

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret =  "whsec_P3nE9egSFka9BlD4trBnJtqBsKD2Mnxy"

require('dotenv').config();
require('./config/passport')();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const roleRoutes = require('./routes/roleRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const itemRoutes = require('./routes/itemRoutes');
const documentRoutes = require('./routes/documentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/uploads', express.static('uploads'));
app.use('/api/documents', documentRoutes);
app.use('/api/notifications', notificationRoutes);




app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount ,
    currency:"inr",
    statement_descriptor_suffix: "Payment using Stripe",
    automatic_payment_methods:{
      enabled: true
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  })
})

app.get("/success", (req, res) => {
  res.send("Payment Successfully! Thank you for your Donations...");

})

app.get("/cancel", (req, res) => {
  res.send("Payment Canceled.. Your Donation was not processed")
})

 

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const customerSubscriptionCreated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.created
      break;
    case 'customer.subscription.deleted':
      const customerSubscriptionDeleted = event.data.object;
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    case 'customer.subscription.trial_will_end':
      const customerSubscriptionTrialWillEnd = event.data.object;
      // Then define and call a function to handle the event customer.subscription.trial_will_end
      break;
    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



// app.get("/", (req, res) => {
//   res.send('hellow')
// })




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
