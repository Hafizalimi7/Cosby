import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../features/cartSlice";


const Cart = () => {

  const cart = useSelector((state) => state.cart);//access to items
  const dispatch = useDispatch()
  
  useEffect(() => {//this will be called when the components renders
    dispatch(getTotals())
  }, [cart, dispatch])//will be called when the cart state chages

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));{/*removes item from cart*/}
  }

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));{/*decrease item amount*/}
  }

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));{/*increase item amount*/}
  }

  const handleClearCart = () => {
    dispatch(clearCart());{/*clears cart*/}
  }

  // const handleGetName = () => {
  //   dispatch(getNames());
  // }

  return (
    <div className="cart-container">
    <h2>Shopping Cart</h2>
    { cart.cartItems.length === 0 ? (
      <div className="cart-empty">
        <p>Your Cart is Currrently Empty..</p>{/*if cart is empty is displays this <<*/}
        <div className="start-shopping">
          <Link to="/">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="currentColor" 
            className="bi bi-arrow-left" 
            viewBox="0 0 16 16"
            >
              <path 
                fillRule="evenodd" 
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 
                8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
            </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {cart.cartItems?.map(cartItem => (//looping threw cartItems array
            <div className="cart-item" key={cartItem.id}>
              <div className="cart-product">
                <img src={cartItem.image} alt={cartItem.name} />{/*display image of item and name*/}
                <div>
                  <h3>{cartItem.name}</h3>
                  <p>{cartItem.desc}</p>{/*displays discription of item*/}
                  <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                </div>
              </div>
              <div className="cart-product-price">£{cartItem.price}</div>{/*shows price of item*/}
              <div className="cart-product-quantity">
                <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                <div className="count">{cartItem.cartQuantity}</div>
                <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
              </div>
              <div className="cart-product-total-price">
                £{cartItem.price * cartItem.cartQuantity}{/*total of item*/}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <button onClick={() => handleClearCart()} className="clear-cart">Clear Cart</button>
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">£{cart.cartTotalAmount}</span>
            </div>
            <p>Taxes and shipping calculated</p>
            <button>Checkout</button>
            {/* <button onClick={() => handleGetName()}>{cart.cartItems[0].name}</button> */}
            <div className="contiue-shooping">
          <Link to="/">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            fill="currentColor" 
            className="bi bi-arrow-left" 
            viewBox="0 0 16 16"
            >
              <path 
                fillRule="evenodd" 
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 
                8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Continue Shopping</span>
            </Link>
        </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};
 
export default Cart;