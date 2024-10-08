import React, { useEffect, useState } from "react";
import "./SideBar.css";
import useData from "../../hooks/useData";
import LinkWithIcon from "./../LinkWithIcon";
import config from "../../config.json";
const SideBar = () => {
  const { data: categories, error } = useData("/category");

  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories &&
          categories.map((category) => (
            <LinkWithIcon
              key={category._id}
              title={category.name}
              link={`/products?category=${category.name}`}
              emoji={`${config.backendURL}/category/${category.image}`}
            />
          ))}
      </div>
    </aside>
  );
};

export default SideBar;
