import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import razorpay from "razorpay"

//global variables
const currency = 'inr'

// gateway initialize 
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// placing orders using COD
const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// placing orders using Stripe, but not available right now.
const placeOrderStripe = async (req, res) => {

}

// placing orders using Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        const razorpayOrder = await razorpayInstance.orders.create(options);
        res.json({ success: true, order: razorpayOrder });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

const verifyRazorpay = async (req, res) => {
    try {

        const userId = req.userId;
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await orderModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: "Payment failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// get all orders for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
// User order data for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// update order status fron admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyRazorpay }