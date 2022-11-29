// import { useNavigate } from "react-router-dom";

import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
  const { data, error, isLoading } =  useGetAllProductsQuery()
  return (  <h2>Home</h2>);
}
 
export default Home;