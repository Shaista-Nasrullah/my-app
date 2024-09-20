import React, { useState, useEffect } from "react"; // Added React import
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // Get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/categories`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
