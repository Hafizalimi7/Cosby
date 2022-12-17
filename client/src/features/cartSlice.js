import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info(`${action.payload.name} increased cart quantity`, {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action){
      const nextCartItems = state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
      )

      state.cartItems = nextCartItems
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
  },
});

export const {addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;