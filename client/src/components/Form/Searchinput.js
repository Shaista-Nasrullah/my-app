import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Searchinput = () => {
  const [values, setValues] = useSearch();
  const [showInput, setShowInput] = useState(false); // State to control input visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      // Ensure that `data.results` is an array
      setValues({ ...values, results: Array.isArray(data) ? data : [] });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconClick = () => {
    setShowInput(true); // Show the input field when the icon is clicked
  };

  return (
    <div>
      {!showInput ? (
        // Show only the search icon initially
        <i
        className="fa-sharp fa-solid fa-magnifying-glass"
        style={{ cursor: "pointer", fontSize: "1.5rem", marginTop: "10px" }}  // Updated styles
        onClick={handleIconClick}
      />
      
      ) : (
        // Show the input field when the state is set to true
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            autoFocus // Focus on the input field when it appears
          />
          {/* <button className="btn btn-outline-success" type="submit">
            Search
          </button> */}
        </form>
      )}
    </div>
  );
};

export default Searchinput;
