import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext, CartContext } from "../Context";

function Header() {
  const baseUrl = "http://127.0.0.1:8000/";
  const userContext = useContext(UserContext);
  const { cartData } = useContext(CartContext);
  const user = localStorage.getItem("customer_login");

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      window.location.href = `/search/${searchQuery}`;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand text-light ps-3" to="">
          BeeKART
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-light"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              
            </form>
            
            <li className="nav-item pe-3">
              <Link className="nav-link text-light" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item pe-4">
              <Link className="nav-link text-light" to="/categories">
                Categories
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account
              </a>
              <ul className="dropdown-menu">
                {!user && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/customer/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/customer/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}

                {user && (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/customer/dashboard">
                        DashBoard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/customer/logout">
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>

            <li className="nav-item pe-4">
              <Link className="nav-link text-light" to="/checkout">
                My Cart ({cartData.length})
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
