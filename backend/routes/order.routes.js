import express from 'express'
import adminAuth from '../middleware/adminAuth.js';
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpay } from '../controllers/order.controller.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();

// admin routes
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//user routes
orderRouter.post('/userorders', authUser, userOrders)

// verify payment of razorpay
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)


export default orderRouter