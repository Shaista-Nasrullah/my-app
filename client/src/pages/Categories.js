import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import "../styles/CategoriesStyles.css"; // Add this line to link your custom CSS

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout
      title="Product Categories - Haji Jewellers"
      description="Explore the wide range of product categories at Haji Jewellers. Find beautiful and unique jewelry pieces, including custom-made silver rings, gold jewelry, and natural stones. Browse through our categories to find the perfect piece for you or your loved ones."
      keywords="Haji Jewellers, product categories, jewelry categories, silver rings, gold jewelry, natural stones, jewelry shop"
      author="Haji Jewellers"
    >
      <Helmet>
        <meta charSet="utf-8" />

        {/* SEO Meta Tags */}
        <meta name="description" content="Explore the wide range of product categories at Haji Jewellers. Find beautiful and unique jewelry pieces, including custom-made silver rings, gold jewelry, and natural stones. Browse through our categories to find the perfect piece for you or your loved ones." />
        <meta name="keywords" content="Haji Jewellers, product categories, jewelry categories, silver rings, gold jewelry, natural stones, jewelry shop" />
        <meta name="author" content="Haji Jewellers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Title for SEO */}
        <title>Product Categories - Haji Jewellers</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Product Categories - Haji Jewellers" />
        <meta property="og:description" content="Explore the wide range of product categories at Haji Jewellers. Find beautiful and unique jewelry pieces, including custom-made silver rings, gold jewelry, and natural stones. Browse through our categories to find the perfect piece for you or your loved ones." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://haji-jewellers.online/categories" />
        <meta property="og:image" content="https://haji-jewellers.online/images/categories.jpg" />
      </Helmet>
      
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


