import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/ProductCard"; // Import useCart for managing cart state
import { Helmet } from "react-helmet"; // Import Helmet for SEO
import "../styles/CategoryProductStyles.css"; // Ensure your CSS file is correctly linked

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart(); // Manage cart state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout
      title={`Category - ${category?.name} | Haji Jewellers`}
      description={`Explore the ${category?.name} category at Haji Jewellers. Find a wide range of high-quality jewelry, including custom-made silver rings and gold jewelry. Discover your perfect piece with ${products?.length} results available.`}
      keywords={`${category?.name}, jewelry, Haji Jewellers, ${category?.name} category, silver rings, gold jewelry, natural stones`}
      author="Haji Jewellers"
    >
      <Helmet>
        <meta charSet="utf-8" />
        {/* SEO Meta Tags */}
        <meta
          name="description"
          content={`Explore the ${category?.name} category at Haji Jewellers. Find a wide range of high-quality jewelry, including custom-made silver rings and gold jewelry. Discover your perfect piece with ${products?.length} results available.`}
        />
        <meta
          name="keywords"
          content={`${category?.name}, jewelry, Haji Jewellers, ${category?.name} category, silver rings, gold jewelry, natural stones`}
        />
        <meta name="author" content="Haji Jewellers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Title for SEO */}
        <title>Category - {category?.name} | Haji Jewellers</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta
          property="og:title"
          content={`Category - ${category?.name} | Haji Jewellers`}
        />
        <meta
          property="og:description"
          content={`Explore the ${category?.name} category at Haji Jewellers. Find a wide range of high-quality jewelry, including custom-made silver rings and gold jewelry. Discover your perfect piece with ${products?.length} results available.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://haji-jewellers.online/category/${params.slug}`}
        />
        <meta
          property="og:image"
          content="https://haji-jewellers.online/images/category.jpg"
        />
      </Helmet>

      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="gallery">
          {products?.map((p) => (
            <div
              className="content"
              key={p._id}
              onClick={() => navigate(`/product/${p.slug}`)}
            >
              <img src={p.photo2} alt={p.name} />
              <h6>{p.name}</h6>
              <p>{p.description.substring(0, 60)}...</p>
              <h6>
                {p.price.toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                })}
              </h6>
              <ul>
                <li>
                  <i className="fa fa-star checked"></i>
                </li>
                <li>
                  <i className="fa fa-star checked"></i>
                </li>
                <li>
                  <i className="fa fa-star checked"></i>
                </li>
                <li>
                  <i className="fa fa-star checked"></i>
                </li>
                <li>
                  <i className="fa fa-star"></i>
                </li>
              </ul>
              <button
                className="product-design"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents card click event
                  addToCart(p);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
