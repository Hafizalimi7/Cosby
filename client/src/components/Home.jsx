import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../features/cartSlice";

import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
  const { data, error, isLoading } =  useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = ( product) =>{
    dispatch(addToCart(product));//
    navigate("/cart")//when add to cart is pressed it go directly to cart page
  }

  return <div className="home-container">
    { isLoading ? (
      <p>loading..</p>//when page is loading
    ): error ? (
      <p>An error occured..</p>//*when an error accurs it says this <<
    ) : (
      <>
        <h2>New Arrivals</h2>
        <div className="products">
          {data?.map((product) => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name} />
              <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
              </div>
            <button onClick={() => handleAddToCart(product)}>
              Add To Cart
              </button>
          </div> 
          ))}
        </div>
      </>
    )}
  </div>;
}
 
export default Home;

