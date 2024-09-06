import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <h3>Search Results</h3>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} products`}
        </h6>
        <div className="gallery">
          {values?.results.map((p) => (
            <div
              className="content"
              key={p._id}
              onClick={() => navigate(`/product/${p.slug}`)} // Makes entire card clickable
              style={{ cursor: "pointer" }} // Changes cursor to pointer on hover
            >
              {p.photo2 ? (
                <img
                  src={p.photo2}
                  alt={p.name || "Product image"}
                  onError={(e) => {
                    e.target.src = "path/to/fallback-image.jpg"; // Replace with your fallback image URL
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  No image available
                </div>
              )}
              <div className="card-body">
                <h6>{p.name || "No name available"}</h6>
                <p>
                  {p.description
                    ? p.description.substring(0, 30)
                    : "No description available"}
                  ...
                </p>
                <h6>
                  {p.price !== undefined
                    ? `PKR ${p.price.toLocaleString("en-PK")}`
                    : "Price not available"}
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
              </div>
              <button
                className="product-design"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents click event from propagating to the card div
                  const cart = JSON.parse(localStorage.getItem("cart")) || [];
                  const updatedCart = [...cart, p];
                  localStorage.setItem("cart", JSON.stringify(updatedCart));
                  alert("Item Added to cart");
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
