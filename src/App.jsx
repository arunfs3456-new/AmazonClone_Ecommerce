import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductView from "./components/ProductView";
import ContextProvider from "./Context/ContextProvider";
import Orders from "./pages/Orders";

function App() {
  const [bgToggle, setBgToggle] = useState(false); 

  return (
    <ContextProvider>
      <BrowserRouter>
        <div
          style={{
            background: bgToggle
              ? "linear-gradient(135deg, #000 50%, #667eea 100%)"
              : "#ffffff",
            minHeight: "100vh",
            transition: "0.4s ease-in-out",
          }}
        >
          <Header /> {/* navbar also affected */}

          <Routes>
            <Route path="/" element={<Home bgToggle={bgToggle} setBgToggle={setBgToggle} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>

          <Footer />
          <Toaster />
        </div>

      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
