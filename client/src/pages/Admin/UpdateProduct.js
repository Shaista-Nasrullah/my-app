import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [id, setId] = useState();

  const navigate = useNavigate();
  const params = useParams();

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      setName(data.product.name);
      setId(data.product._id);
      setPhoto2(data.product.photo2);
      setPhoto3(data.product.photo3);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
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
      toast.error("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product
  const handleUpdate = async () => {
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("photo2", photo2);
      productData.append("photo3", photo3);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      const { data } = axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete product

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      //navigate("/dashboard/admin/products");
    } catch (error) {  // Add 'error' as a parameter here
      console.log(error);  // Now 'error' is defined and can be logged
      toast.error("Something went wrong");
    }
  };
  

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4>Update Product</h4>
            <div className="m-1 w-75">
              {/* Category Select */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="Large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Photo Upload for First Photo */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo2
                    ? typeof photo2 === "string"
                      ? "Change First Photo"
                      : photo2.name
                    : "Upload First Photo"}
                  <input
                    type="file"
                    name="photo2"
                    accept="image/*"
                    onChange={(e) => setPhoto2(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Photo Preview for First Photo */}
              <div className="mb-3">
                {photo2 && (
                  <div className="text-center">
                    {typeof photo2 === "string" ? (
                      <img
                        src={photo2}
                        alt="product_photo_one"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(photo2)}
                        alt="product_photo_one"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Photo Upload for Second Photo */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo3
                    ? typeof photo3 === "string"
                      ? "Change Second Photo"
                      : photo3.name
                    : "Upload Second Photo"}
                  <input
                    type="file"
                    name="photo3"
                    accept="image/*"
                    onChange={(e) => setPhoto3(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Photo Preview for Second Photo */}
              <div className="mb-3">
                {photo3 && (
                  <div className="text-center">
                    {typeof photo3 === "string" ? (
                      <img
                        src={photo3}
                        alt="product_photo_two"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(photo3)}
                        alt="product_photo_two"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Price Input */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Set a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Quantity Input */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Set a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* Shipping Select */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Shipping"
                  size="Large"
                  className="form-select mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
