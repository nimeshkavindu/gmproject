import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:4000";  

    const [product_list, setProductList] = useState([]);  
    const [cartItems, setCartItems] = useState({}); 
    const [token, setToken] = useState("");  

    const currency = "$";
    const deliveryCharge = 5;

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 1) - 1, 0) // Prevent negative values
        }));

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    let itemInfo = product_list.find((product) => product._id === item);
                    totalAmount += itemInfo.price * cartItems[item];
                }
            } catch (error) {
                console.error("Error calculating cart total:", error);
            }
        }
        return totalAmount;
    };

    // Fetch all products from backend
    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            setProductList(response.data.data);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // Load cart data from backend
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Load data on component mount
    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        url,
        product_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
