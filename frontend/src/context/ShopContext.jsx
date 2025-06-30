import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setsearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);
    const [cartItems, setcartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [token, setToken] = useState('');


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size')
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size]++;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setcartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setcartItems(cartData);
        console.log(token);
        console.log(cartItems);
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let total = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        total += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {

                }
            }
        }
        return total;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
            if (response.data.success) {
                setcartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }

    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setsearch, showSearch, setshowSearch,
        cartItems, addToCart, setcartItems,
        getCartCount, updateQuantity, getCartAmount, navigate, backendUrl,
        setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;







// This file sets up a React Context to manage and provide shared data (like products, currency, and delivery fee) across components in an e-commerce website. Here's what each part does:

// Key Components in the File:
// createContext:

// Creates a context (ShopContext) that can hold shared data for the e-commerce application.
// It allows the data to be accessible to any component in the component tree without having to pass props down manually at each level.
// ShopContextProvider:

// A React component that acts as a provider for the context.
// It wraps child components (props.children) and makes the value object available to them through the context.
// Shared Data in the Context:

// products: Likely an array or object imported from ../assets/assets containing information about the products for sale.
// currency: A string ('$') specifying the currency used in the e-commerce app.
// delivery_fee: A number (10) representing the fixed delivery fee.
// How It Works:

// Any component wrapped by ShopContextProvider can access products, currency, and delivery_fee using the ShopContext.
// Usage in an E-commerce Website:
// Centralized Data Management:

// Ensures that key details (e.g., product list, currency, and delivery fee) are available in a single place and can be accessed by multiple components like the product list, shopping cart, or checkout page.
// Simplifies Prop Drilling:

// Eliminates the need to pass products, currency, or delivery_fee through multiple levels of props.
// Provides Consistency:

// Ensures all components use the same data for products and configurations like currency and delivery fee.
// Example:
// A Product List component might access products to display all available items.
// A Cart Summary component might use delivery_fee to calculate the total cost.
// All components use the same currency value, ensuring consistency across the app.