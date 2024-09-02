import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/ProductCard";
import { AiOutlineReload } from "react-icons/ai";
import toast from "react-hot-toast";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      //console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      //console.log(error);
      setLoading(false);
    }
  };

  // Fetch products when filters change
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  // Filtering products function
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter by Category Component
  const FilterByCategory = ({ categories, onFilter }) => {
    const [showCategoryFilters, setShowCategoryFilters] = useState(false);

    const handleCategoryButtonClick = () => {
      setShowCategoryFilters(!showCategoryFilters);
    };

    const handleCategoryFilter = (isChecked, categoryId) => {
      const updatedChecked = isChecked
        ? [...checked, categoryId]
        : checked.filter((id) => id !== categoryId);

      setChecked(updatedChecked);
      setShowCategoryFilters(false);
    };

    return (
      <div className="filter-category">
        <button
          onClick={handleCategoryButtonClick}
          className="filter-toggle-button"
        >
          Filter By Category
        </button>
        {showCategoryFilters && (
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Filter by Price Component
  const FilterByPrice = ({ onFilter }) => {
    const [showPriceFilters, setShowPriceFilters] = useState(false);

    const handlePriceButtonClick = () => {
      setShowPriceFilters(!showPriceFilters);
    };

    const handlePriceFilter = (value) => {
      setRadio(value);
      setShowPriceFilters(false);
    };

    return (
      <div className="filter-price">
        <button
          onClick={handlePriceButtonClick}
          className="filter-toggle-button"
        >
          Filter By Price
        </button>
        {showPriceFilters && (
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => handlePriceFilter(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* banner image */}

      <img
        src="/images/these.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />

      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Align filter buttons on left and right side */}
          <FilterByCategory categories={categories} onFilter={setChecked} />
          <FilterByPrice onFilter={setRadio} />
        </div>

        {/* Reset filters */}
        <div className="d-flex justify-content-center my-3">
          <button
            className="all-products-button"
            onClick={() => window.location.reload()}
          >
            All Products
          </button>
        </div>

        <div className="col-md-12">
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                className="card m-3"
                key={p._id}
                onClick={() => navigate(`/product/${p.slug}`)}
              >
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
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Load more <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
