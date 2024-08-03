import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./../Home/HomePage";
import ProductsPage from "./../Products/ProductsPage";
import SingleProductPage from "./../SingleProduct/SingleProductPage";
import CartPage from "./../Cart/CartPage";
import MyOrderPage from "./../MyOrder/MyOrderPage";
import LoginPage from "./../Authentication/LoginPage";
import SignupPage from "./../Authentication/SignupPage";
import LogOut from "../Authentication/LogOut";
import ProtectedRoutes from "./ProtectedRoutes";

const Routingg = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<LogOut />} />
      </Route>
    </Routes>
  );
};

export default Routingg;
