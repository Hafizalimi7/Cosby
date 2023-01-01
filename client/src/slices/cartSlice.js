import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  cartItems: localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) 
  : [],//checks if item exist in localStorage if it doesn't default is epmty array
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  emptyBasket: []
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
        cartItem => cartItem.id !== action.payload.id//comparing to see if item is the same, return array without action.payload.id
      )

      state.cartItems = nextCartItems;//removes item from cart
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));//new array of items

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
       cartItem => cartItem.id === action.payload.id//check if id are the same to get itemIndex
      ) 

      if(state.cartItems[itemIndex].cartQuantity > 1){
        state.cartItems[itemIndex].cartQuantity -= 1

        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1){
        const nextCartItems = state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id//this removes the item if one is left
        );

        state.cartItems = nextCartItems

        toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    clearCart(state, action) {
      state.cartItems = [];//bring back an empty cart
      toast.error(`Cart Cleared`, {
        position: "bottom-left",
    });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
     let {total, quantity } =  state.cartItems.reduce(//first para is an acummulator
        (cartTotal, cartItem) => {
        const { price, cartQuantity } = cartItem;//destructioning from cartItem
        const itemTotal = price * cartQuantity;//item total

        cartTotal.total += itemTotal;//storing itemTotal in cartTotal total in total
        cartTotal.quantity += cartQuantity;//this would give the total cart quantity

        // console.log(cartTotal)

        return cartTotal;
      }, 
      {
        total: 0,
        quantity: 0,//would be total cart quantity
      }
     );

     state.cartTotalAmount = total;
     state.cartTotalQuantity = quantity;
     
    },
    // getNames(state, action){
    //   // const existingIndex = state.cartItems.findIndex(//findIndex checks if we already have that item
    //   //   (item) => item.id === action.payload.id//checks if item in the cart exists
    //   // );

    //   // console.log(existingIndex.push("hello"))

    //   console.log("hello")

    //   toast.success(`${action.payload.name} removed from cart`, {
    //     position: "bottom-left",
    //   });
    // },
  },
});

export const {addToCart, removeFromCart, decreaseCart, clearCart, getTotals} = cartSlice.actions;

export default cartSlice.reducer;