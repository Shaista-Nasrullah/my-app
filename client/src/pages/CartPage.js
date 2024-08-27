// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/ProductCard";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("Braintree"); // default to Braintree
//   const navigate = useNavigate();

//   // total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total += item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // delete item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
//       );
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   // handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       let nonce = null;
//       if (paymentMethod === "Braintree") {
//         const { nonce: generatedNonce } = await instance.requestPaymentMethod();
//         nonce = generatedNonce;
//       }
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
//         {
//           nonce,
//           cart,
//           paymentMethod,
//         }
//       );
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Order placed successfully");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const bankDetails = "Bank Account: 123456789, Bank Name: XYZ Bank";
//   const easypaisaNumber = "Easypaisa Number: 0987654321";

//   return (
//     <Layout>
//     <div className="cart-page">
//   <div className="row">
//     <div className="col-md-12">
//       <h1 className="text-center bg-light p-2 mb-1">
//         {`Hello ${auth?.token && auth?.user?.name}`}
//       </h1>
//       <h4 className="text-center">
//         {cart?.length
//           ? `You Have ${cart.length} items in your cart ${
//               auth?.token ? "" : "please login to checkout"
//             }`
//           : "Your Cart Is Empty"}
//       </h4>
//     </div>
//   </div>
//   <div className="container">
//     <div className="row">
//       <div className="col-md-7 p-0 m-0">
//         {cart?.map((p) => (
//           <div className="row card flex-row" key={p._id}>
//             <div className="col-md-4">
//               <img
//                 src={p.photo2}
//                 className="card-img-top"
//                 alt={p.name}
//                 width="100%"
//                 height={"130px"}
//               />
//             </div>
//             <div className="col-md-4">
//               <p>{p.name}</p>
//               <p>{p.description.substring(0, 30)}</p>
//               <p>Price : {p.price}</p>
//             </div>
//             <div className="col-md-4 cart-remove-btn">
//               <button
//                 className="btn btn-danger"
//                 onClick={() => removeCartItem(p._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="col-md-5 cart-summary">
//         <h2>Cart Summary</h2>
//         <p>Total | Checkout | Payment</p>
//         <hr />
//         <h4>Total : {totalPrice()} </h4>
//         {auth?.user?.address ? (
//           <>
//             <div className="mb-3">
//               <h4>Current Address</h4>
//               <h5>{auth?.user?.address}</h5>
//               <button
//                 className="btn btn-outline-warning"
//                 onClick={() => navigate("/dashboard/user/profile")}
//               >
//                 Update Address
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="mb-3">
//             {auth?.token ? (
//               <button
//                 className="btn btn-outline-warning"
//                 onClick={() => navigate("/dashboard/user/profile")}
//               >
//                 Update Address
//               </button>
//             ) : (
//               <button
//                 className="btn btn-outline-warning"
//                 onClick={() =>
//                   navigate("/login", {
//                     state: "/cart",
//                   })
//                 }
//               >
//                 Please Login to checkout
//               </button>
//             )}
//           </div>
//         )}
//         <div className="mt-2">
//           <h4>Select Payment Method</h4>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="Braintree"
//                 checked={paymentMethod === "Braintree"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />{" "}
//               Braintree
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="Cash on Delivery"
//                 checked={paymentMethod === "Cash on Delivery"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />{" "}
//               Cash on Delivery
//             </label>
//           </div>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 value="Direct Bank Transfer"
//                 checked={paymentMethod === "Direct Bank Transfer"}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               />{" "}
//               Direct Bank Transfer
//             </label>
//           </div>

//           {paymentMethod === "Direct Bank Transfer" && (
//             <div className="mt-3">
//               <h5>Bank Account Details:</h5>
//               <p>Account Number: 123456789</p>
//               <p>Easypaisa Number: 987654321</p>
//             </div>
//           )}

//           {paymentMethod === "Braintree" &&
//             clientToken &&
//             cart?.length > 0 && (
//               <DropIn
//                 options={{
//                   authorization: clientToken,
//                   paypal: {
//                     flow: "vault",
//                   },
//                 }}
//                 onInstance={(instance) => setInstance(instance)}
//               />
//             )}

//           <button
//             className="btn btn-primary mt-3"
//             onClick={handlePayment}
//             disabled={
//               loading ||
//               (paymentMethod === "Braintree" && !instance) ||
//               !auth?.user?.address
//             }
//           >
//             {loading ? "Processing ...." : "Place Order"}
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//     </Layout>
//   );
// };

// export default CartPage;

import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/ProductCard";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Braintree"); // default to Braintree
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      let nonce = null;
      if (paymentMethod === "Braintree") {
        const { nonce: generatedNonce } = await instance.requestPaymentMethod();
        nonce = generatedNonce;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
          paymentMethod,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Order placed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-sm-12 p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-4">
                    <img
                      src={p.photo2}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-5">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: {p.price}</p>
                  </div>
                  <div className="col-3 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 col-sm-12 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                <h4>Select Payment Method</h4>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Braintree"
                      checked={paymentMethod === "Braintree"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />{" "}
                    Braintree
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Cash on Delivery"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />{" "}
                    Cash on Delivery
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Direct Bank Transfer"
                      checked={paymentMethod === "Direct Bank Transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />{" "}
                    Direct Bank Transfer
                  </label>
                </div>

                {paymentMethod === "Direct Bank Transfer" && (
                  <div className="mt-3">
                    <h5>Bank Account Details:</h5>
                    <p>Account Number: 123456789</p>
                    <p>Account Title: Shaista</p>
                    <p>Easypaisa Number: 987654321</p>
                  </div>
                )}

                {paymentMethod === "Braintree" &&
                  clientToken &&
                  cart?.length > 0 && (
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  )}

                <button
                  className="btn btn-primary mt-3"
                  onClick={handlePayment}
                  disabled={
                    loading ||
                    (paymentMethod === "Braintree" && !instance) ||
                    !auth?.user?.address
                  }
                >
                  {loading ? "Processing ...." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
