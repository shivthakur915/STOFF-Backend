const express=require('express');
const router=express.Router();
const Razorpay=require('razorpay');
const dotenv=require('dotenv');
const uniqid = require('uniqid'); 

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SEC,
});

router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	//console.log(req.body.total);
	const amount = req.body.total
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: uniqid(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		//console.log(response)
		res.status(201).json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports=router;