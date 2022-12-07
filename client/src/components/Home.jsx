import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../features/cartSlice";

import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
  const { data, error, isLoading } =  useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = ( product) =>{
    dispatch(addToCart(product));
    navigate("/cart")
  }

  return <div className="home-container">
    { isLoading ? (
      <p>loading..</p> 
    ): error ? (
      <p>An error occured..</p>
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

// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router";
// import { addToCart } from "../features/cartSlice";
// import { useGetAllProductsQuery } from "../features/productsApi";

// const Home = () => {
//   const { items: products, status } = useSelector((state) => state.products);
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const { data, error, isLoading } = useGetAllProductsQuery();
//   console.log("Api", isLoading);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     // history.push("/cart");
//   };

//   return (
//     <div className="home-container">
//       {status === "success" ? (
//         <>
//           <h2>New Arrivals</h2>
//           <div className="products">
//             {data &&
//               data?.map((product) => (
//                 <div key={product.id} className="product">
//                   <h3>{product.name}</h3>
//                   <img src={product.image} alt={product.name} />
//                   <div className="details">
//                     <span>{product.desc}</span>
//                     <span className="price">${product.price}</span>
//                   </div>
//                   <button onClick={() => handleAddToCart(product)}>
//                     Add To Cart
//                   </button>
//                 </div>
//               ))}
//           </div>
//         </>
//       ) : status === "pending" ? (
//         <p>Loading...</p>
//       ) : (
//         <p>Unexpected error occured...</p>
//       )}
//     </div>
//   );
// };

// export default Home;