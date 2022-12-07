import './App.css';
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <ToastContainer />
        <NavBar/>
        <Routes>
          <Route path="/cart" exact element={<Cart/>} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path="/" exact element={<Home/>} />
          <Route to="/not-found" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
