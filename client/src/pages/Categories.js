import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import "../styles/CategoriesStyles.css"; // Add this line to link your custom CSS

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row category-container">
          {categories.map((c) => (
            <div className="col-md-6 col-lg-4 mt-4" key={c._id}>
              <Link to={`/category/${c.slug}`} className="category-card">
                <div className="category-content">
                  <h3>{c.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;

