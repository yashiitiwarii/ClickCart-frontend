import React from "react";
import "./ProductsPage.css";
import SideBar from "./SideBar";
import ProductsList from "./ProductsList";
const ProductsPage = () => {
  return (
    <section className=" products_page">
      <SideBar />
      <ProductsList />
    </section>
  );
};

export default ProductsPage;
