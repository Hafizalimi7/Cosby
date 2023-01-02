import './App.css';
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import Register from './components/auth/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <ToastContainer />{/*no be able to add toast messages*/}
        <NavBar/> {/* navbar in each screen*/}
        <div className='content-container'>
          
          <Routes>{/*allows us to route each route at a time*/}
            <Route path="/" exact element={<Home/>} /> {/*exact goes to the exact route*/}
            <Route path="/cart" exact element={<Cart/>} /> {/*cart page*/}
            <Route path="/register" element={<Register/>} />
            <Route path="/not-found" element={<NotFound/>} /> {/*not found page*/}
            <Route to="/not-found" /> {/*redirects to not-found when entered invialed url*/}
          </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
