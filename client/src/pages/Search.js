// //import React, { useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { useSearch } from "../context/search";

// const Search = () => {
//   const [values, setValues] = useSearch();
//   return (
//     <Layout title={"Search results"}>
//       <div className="container">
//         <div className="text-center">
//           <h1>Search Results</h1>
//           <h6>
//             {values?.results.length < 1
//               ? "No Products Found"
//               : `Found ${values?.results.length}`}
//           </h6>
//           <div className="d-flex flex-wrap mt-4">
//             {values?.results.map((p) => (
//               <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
//                 <img
//                   src={p.photo2}
//                   className="card-img-top"
//                   style={{ width: "280px", height: "280px" }}
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="card-text">
//                     {p.description
//                       ? p.description.substring(0, 30)
//                       : "No description available"}
//                     ...
//                   </p>

//                   <p className="card-text"> $ {p.price}</p>
//                   <button className="btn btn-secondary ms-1">
//                     More Details
//                   </button>
//                   <button className="btn btn-primary ms-1">Add To Cart</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Search;



//import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                {p.photo2 ? (
                  <img
                    src={p.photo2}
                    className="card-img-top"
                    style={{ width: "280px", height: "280px" }}
                    alt={p.name || "Product image"}
                    onError={(e) => {
                      e.target.src = "path/to/fallback-image.jpg"; // Replace with your fallback image URL
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "280px",
                      height: "280px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    No image available
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {p.name || "No name available"}
                  </h5>
                  <p className="card-text">
                    {p.description
                      ? p.description.substring(0, 30)
                      : "No description available"}
                    ...
                  </p>
                  <p className="card-text">
                    $ {p.price !== undefined ? p.price : "0.00"}
                  </p>
                  <button className="btn btn-secondary ms-1">
                    More Details
                  </button>
                  <button className="btn btn-primary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

