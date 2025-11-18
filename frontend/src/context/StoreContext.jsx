import axios from "axios";

import { createContext, useEffect, useState } from "react";

/*StoreContextProvider component manages the state and actions related to the shopping cart and product items. 
It provides functions to add and remove items from the cart, calculate the total cart amount, fetch the product list, and load cart data */


export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url ="http://localhost:4000";
    const [token,setToken] = useState("");
    const [item_list,setItemList]=useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {

            setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            
        }
    }

    const removeFromCart = async (itemId) => {
      
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = item_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];

            }

        }
        return totalAmount;
    }
    const fetchItemList= async ()=>{
        const response = await axios.get(url+"/api/product/list");
        setItemList(response.data.data)
    }

    const loadCartData= async (token)=>{
        const response= await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }
    
    useEffect(()=>{
        
        async function loadData(){
            await fetchItemList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
                
            }
        }
        loadData();
    },[])

    const contextValue = {
        item_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken


    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider