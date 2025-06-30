import React, { useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setmethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setcartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setformData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setformData(data => ({ ...data, [name]: value }));
  }

  //for razorpay

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/order/verifyRazorpay',
            response,
            { headers: { token } }
          );

          if (data.success) {
            setcartItems({});
            toast.success("You earned 10 coins on this order");
            setTimeout(() => {
              navigate('/orders');
            }, 1000);
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      }

    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee

      }

      switch (method) {
        // api calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setcartItems({});
            navigate('/orders')
            toast.success("You earned 10 coins on this order")
          }
          else {
            toast.error(response.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order)
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandeler} className='flex justify-between flex-col sm:flex-row gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' required />
        </div>
        <input onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' required />
        <input onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' required />
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' required />
          <input onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' required />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' required />
          <input onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' required />
        </div>
        <input onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone number' required />

      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* This is for stripe method but not available right now. */}
            {/* <div onClick={() => { setmethod('stripe') }} className='flex items-center gap-3 border p-2 px-3 cursor-pointer pointer-events-none'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
            </div> */}
            <div onClick={() => { setmethod('cod') }} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
            <div onClick={() => { setmethod('razorpay') }} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white text-sm px-16 py-3 rounded-lg'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder