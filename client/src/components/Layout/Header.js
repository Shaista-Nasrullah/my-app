import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Searchinput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/ProductCard";
import { Badge } from "antd";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <>
      {/* <!---------first nav---------> */}
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa-solid fa-envelope text-light contact-info email" />
              <a
                href="#"
                className="navbar-sm-barnd text-light text-decoration-none email"
              >
                hajijewellers856@gmail.com
              </a>
              <i className="fa-solid fa-phone text-light contact-info" />
              <a
                href="#"
                className="navbar-sm-barnd text-light text-decoration-none"
              >
                0340-1248854
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/share/kcGCaoEvJZ9SUqPL/?mibextid=LQQJ4d"
                className="text-white"
              >
                <i className="fa-brands fa-facebook me-2" />
              </a>
              <a
                href="https://www.instagram.com/hajijewellers2022/"
                className="text-white"
              >
                <i className="fa-brands fa-instagram me-2" />
              </a>
              <a
                href="https://www.tiktok.com/@shaista.nasrullah?_t=8pUTj5JDiEB&_r=1"
                className="text-white"
              >
                <i className="fa-brands fa-tiktok me-2" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* <!---------first nav ends---------> */}

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-header">
        <div className="container d-flex justify-content-between">
          {/* Hamburger Button on the Left */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Brand Name */}
          {/* Brand Name - Now Clickable */}
          <div className="d-flex align-items-center">
            <NavLink to="/" className="navbar-brand">
              <p className="text-success">Haji Jewellers</p>
            </NavLink>
          </div>

          {/* Search Input and Cart */}
          <div className="d-flex">
            <Searchinput />
            <NavLink to="/cart" className="nav-link card-item">
              <Badge count={cart?.length} showZero offset={[10, -5]}>
                🛒
              </Badge>
            </NavLink>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    All Categories
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
