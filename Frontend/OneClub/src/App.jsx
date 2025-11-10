import React from "react";
import Navbar from "./Components/Navbar";
// import Home from "./Pages/Home";
import Collections from "./Pages/Collections";
import Contact from "./Pages/Contact";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import Search from "./Components/Search";
import Admin from "./Pages/Admin";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Favorite from "./Pages/Favorite";
import PlaceOrderPage from "./Pages/PlaceOrderPage";
import Myprofile from "./Pages/Myprofile";
import OrderHistory from "./Pages/OrderHistory";
import AdminOrders from "./Pages/AdminOrders";
import Vendor from "./Pages/Vendor";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/Admin";
  const isCart = location.pathname === "/cart";
  const isLogin = location.pathname === "/login";
  const isplaceorder = location.pathname === "/place-order";
  const isVendor = location.pathname === "/Vendor";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        {!isAdminPage && !isLogin && !isVendor && <Navbar />}
        {!isAdminPage && !isLogin && !isVendor && <Search />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Favorite" element={<Favorite />} />
          <Route path="/Collections" element={<Collections />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />
          <Route path="/Product/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Myprofile" element={<Myprofile />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/orders" element={<AdminOrders/>} />
          <Route path="/Vendor" element={<Vendor />} />
        </Routes>

        {!isAdminPage && !isCart && !isLogin && !isplaceorder && !isVendor && <Footer />}
      </div>
    </>
  );
};

export default App;