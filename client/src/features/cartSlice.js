import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  cartItems: localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) 
  : [],//checks if item exist in localStorage if it doesn't default is epmty array
  cartTotalQuantity: 0,
  cartTotalAmount: 0
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(//findIndex checks if we already have that item
        (item) => item.id === action.payload.id//checks if item in the cart exists
      );

      if (existingIndex >= 0) {//means item is in the cart
        state.cartItems[existingIndex] = {//item in the cart
          ...state.cartItems[existingIndex],//spread of the item
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,//increases quantity by one
        };
        toast.info(`${action.payload.name} increased cart quantity`, {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };//adds to carts with the quantity equal to 1
        state.cartItems.push(tempProductItem);//adds item to cart
        toast.success(`${action.payload.name} added to cart`, {
          position: "bottom-left",
        });
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems))//adds item to localStorage & converts js to json string with key
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
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
       cartItem => cartItem.id === action.payload.id
      ) 

      if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -= 1

        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1){
        const nextCartItems = state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        );

        state.cartItems = nextCartItems

        toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

    }
  },
});

export const {addToCart, removeFromCart, decreaseCart } = cartSlice.actions;

export default cartSlice.reducer;