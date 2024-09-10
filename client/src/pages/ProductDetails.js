import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/ProductCard";
import { Helmet } from "react-helmet"; // Import Helmet for SEO
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        {/* SEO Meta Tags */}
        <meta name="description" content={`${product.name} - ${product.description}. Buy now at Haji Jewellers. Price: ${product?.price?.toLocaleString("en-PK", { style: "currency", currency: "PKR" })}.`} />
        <meta name="keywords" content={`${product.name}, ${product.category?.name}, jewelry, Haji Jewellers, buy ${product.name}, ${product.category?.name} jewelry`} />
        <meta name="author" content="Haji Jewellers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{product.name} | Product Details | Haji Jewellers</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={`${product.name} | Product Details | Haji Jewellers`} />
        <meta property="og:description" content={`${product.name} - ${product.description}. Buy now at Haji Jewellers. Price: ${product?.price?.toLocaleString("en-PK", { style: "currency", currency: "PKR" })}.`} />
        <meta property="og:image" content={product.photo2 || "https://haji-jewellers.online/images/default-product.jpg"} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://haji-jewellers.online/product/${params.slug}`} />
      </Helmet>

      <div className="container product-details">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.photo2}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1>{product.name}</h1>
            <hr />
            <div className="product-info">
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {product?.price?.toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                })}
              </p>
              <p>
                <strong>Category:</strong> {product?.category?.name}
              </p>
              <div className="text-center mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="similar-products">
          <h4>Similar Products ➡️</h4>
          {relatedProducts.length < 1 && <p>No Similar Products found</p>}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img src={p.photo2} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-PK", {
                        style: "currency",
                        currency: "PKR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

