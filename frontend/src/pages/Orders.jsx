import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets.js';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setorders] = useState([]);
  const [coinAmount, setcoinAmount] = useState(0);

  const loadOrderdata = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorders(allOrdersItem.reverse());
        setcoinAmount(allOrdersItem.length * 10)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    loadOrderdata()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='flex items-center justify-between'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'} />
        </div>
        <div className='mb-3 flex items-center'>
          <p>Total Coins Earned</p>
          <img className='w-8 h-9' src={assets.coin_icon} alt="" />
          <p>: {coinAmount}</p> </div>
      </div>
      <div>
        {orders.length > 0 ? orders.map((item, index) => {
          return <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-1'>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-1'>Payment: <span className='text-gray-500'>{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                <p className='text-sm md:text-base'>{item.status}</p>
              </div>
              <button onClick={loadOrderdata} className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-300'>Track Order</button>
            </div>
          </div>
        }) : <p className='text-lg text-gray-500 mt-8'>No orders found.</p>}
      </div>
    </div>
  )
}

export default Orders