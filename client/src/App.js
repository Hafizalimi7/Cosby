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
      <ToastContainer />{/*no be able to add toast messages*/}
        <NavBar/> {/* navbar in each screen*/}
        <Routes>{/*allows us to route each route at a time*/}
          <Route path="/cart" exact element={<Cart/>} /> {/*cart page*/}
          <Route path="/not-found" element={<NotFound/>} /> {/*not found page*/}
          <Route path="/" exact element={<Home/>} /> {/*exact goes to the exact route*/}
          <Route to="/not-found" /> {/*redirects to not-found when entered invialed url*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
