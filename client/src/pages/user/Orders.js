// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";
// import { useAuth } from "../../context/auth";
// import moment from "moment";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
//       setOrders(data);
//     } catch (error) {
//       console.log("Error fetching orders:", error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   return (
//     <Layout title={"Your Orders"}>
//       <div className="container-fluid p-3 m-3 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             {orders?.map((o, i) => (
//               <div className="border shadow mb-3" key={o._id}>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Status</th>
//                       <th scope="col">Buyer</th>
//                       <th scope="col">Date</th>
//                       <th scope="col">Payment Status</th>
//                       <th scope="col">Payment Method</th>
//                       <th scope="col">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>{o?.status}</td>
//                       <td>{o?.buyer?.name}</td>
//                       <td>{moment(o?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
//                       <td>{o?.payment?.success ? "Success" : "Pending"}</td>
//                       <td>{o?.payment?.method || "Not Specified"}</td>
//                       <td>{o?.products?.length}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="container">
//                   {o?.products?.map((p) => (
//                     <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                       <div className="col-md-4">
//                         <img
//                           src={p.photo2} // Assuming p.photo2 is the Cloudinary link
//                           className="card-img-top"
//                           alt={p.name}
//                           width="40px"
//                           height={"150px"}
//                         />
//                       </div>
//                       <div className="col-md-8">
//                         <p>{p.name}</p>
//                         <p>{p.description.substring(0, 30)}...</p>
//                         <p>Price: ${p.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;

import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import "../../styles/OrdersStyles.css"; // Create and link your custom CSS

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => (
              <div className="border shadow mb-3" key={o._id}>
                <table className="table table-responsive-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>
                        {moment(o?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                      </td>
                      <td>{o?.payment?.success ? "Success" : "Pending"}</td>
                      <td>{o?.payment?.method || "Not Specified"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-4 col-sm-3 col-md-2">
                        <img
                          src={p.photo2}
                          className="card-img-top img-fluid"
                          alt={p.name}
                        />
                      </div>
                      <div className="col-8 col-sm-9 col-md-10">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}...</p>
                        <p>Price: ${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
