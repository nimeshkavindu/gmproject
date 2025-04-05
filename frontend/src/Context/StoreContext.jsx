import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";

  const [product_list, setProductList] = useState([]);
  // Always initialize cartItems as an object
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const currency = "Rs.";
  const deliveryCharge = 250;

  // Add item to cart (ensuring we update our local state)
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCount = Math.max((prev[itemId] || 1) - 1, 0);
      return {
        ...prev,
        [itemId]: updatedCount,
      };
    });

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Calculate total cart amount safely
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = product_list.find(
          (product) => product.id === parseInt(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.error(`Product with id ${itemId} not found.`);
        }
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

  // Load cart data from backend and convert to object if needed
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token } }
      );
      // Ensure that the cartData is an object
      const cartData = response.data.cartData;
      if (typeof cartData === "object" && cartData !== null) {
        setCartItems(cartData);
      } else {
        console.error("Unexpected cartData format:", cartData);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

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
    deliveryCharge,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
