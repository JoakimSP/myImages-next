import React, { createContext, useReducer } from "react";
import { toast } from "react-toastify"
// Define the context
const CartContext = createContext();




// Define the reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

// Define the provider
const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

const addToCart = async (item) => {
  const isDuplicate = cart.some(element => element === item);
  if (!isDuplicate) {
    dispatch({ type: "ADD_ITEM", item });
  } else {
    toast.warn("Item is already in the cart");
  }
};


  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };


