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
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

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

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      <img
        src="/images/these.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />

      <div className="container-fluid row mt-3 home-page">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <FilterByCategory categories={categories} onFilter={setChecked} />
          <FilterByPrice onFilter={setRadio} />
        </div>

        <div className="d-flex justify-content-center my-3">
          <button
            className="all-products"
            onClick={() => window.location.reload()}
          >
            All Products
          </button>
        </div>

        <div className="col-md-12 gallery">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div
                className="content"
                key={p._id}
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <img
                  src={p.photo2}
                  className="product-image"
                  alt={p.name}
                />
                <div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
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
                    className="buy-design"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    Add to Cart
                  </button>
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
