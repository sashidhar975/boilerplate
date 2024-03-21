const Subscription = require('../models/Subscription');
const Transaction = require('../models/Transaction');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.subscribeToPlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.user._id;

        
        let amount = 0;
        if (planId === 'monthly') {
            // First month free, subsequent months $10
            amount = 1000; // Stripe uses => amount in cents
        } else if (planId === 'yearly') {
            // Yearly subscription $100
            amount = 10000;
        } else {
            return res.status(400).json({ message: 'Invalid plan ID' });
        }

       
        const customer = await stripe.customers.create({
            email: req.user.email 
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: process.env.STRIPE_PLAN_PRICES[planId] }],
            trial_period_days: planId === 'monthly' ? 30 : undefined // First month free for monthly plan
        });

        const newSubscription = new Subscription({
            userId,
            planId,
            stripeCustomerId: customer.id,
            stripeSubscriptionId: subscription.id,
            startDate: new Date(),
            status: 'active'
        });
        await newSubscription.save();

        res.json({ message: 'Subscribed successfully', subscription: newSubscription });
    } catch (err) {
        console.error('Error subscribing user to plan:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.handlePayment = async (req, res) => {
    try {
        const { amount, currency, method, cardDetails } = req.body;
        const transaction = new Transaction({
            amount,
            currency,
            method,
            cardDetails,
            status: 'Success'
        });
        await transaction.save();

        res.json({ message: 'Payment successful', transaction });
    } catch (err) {
        console.error('Error processing payment:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTransactionHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const transactions = await Transaction.find({ userId });

        res.json({ transactions });
    } catch (err) {
        console.error('Error fetching transaction history:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


