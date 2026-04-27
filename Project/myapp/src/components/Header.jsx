import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import "./OrganicPage.css";

const allProducts = productsData;
const categories = categoriesData;

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [navActive, setNavActive] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [mobileDropdownActive, setMobileDropdownActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  // ✅ LOGIN CHECK
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = async () => {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });

    alert("Logged out successfully ✅");
    navigate("/login");
    window.location.reload(); // refresh UI
  };

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navActive &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setNavActive(false);
      }

      if (
        mobileDropdownActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setMobileDropdownActive(false);
      }

      if (
        mobileSearchActive &&
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        !e.target.closest(".header-search-mobile")
      ) {
        setMobileSearchActive(false);
        setShowSuggestions(false);
      }

      if (
        showSuggestions &&
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target) &&
        !e.target.closest(".search-wrapper")
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [navActive, mobileDropdownActive, mobileSearchActive, showSuggestions]);

  const handleSearch = (term) => {
    if (!term) return;
    const product = allProducts.find(
      (p) => p.name.toLowerCase() === term.toLowerCase(),
    );
    if (product) {
      navigate(`/product/${encodeURIComponent(product.name)}`);
      setSearchTerm("");
      setSuggestions([]);
      setNavActive(false);
      setMobileSearchActive(false);
      setMobileDropdownActive(false);
      setShowSuggestions(false);
    } else {
      setSuggestions([]);
      setShowSuggestions(true);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    handleSearch(name);
    setShowSuggestions(false);
  };

  return (
    <header className="header">
      {/* Mobile left: Hamburger */}
      <div className="header-left-mobile" ref={hamburgerRef}>
        <div className="hamburger" onClick={() => setNavActive(!navActive)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Center Logo */}
      <div className="header-logo">
        <Link to="/">
          <img src="/logo.jpg" alt="OrganicMarket Logo" />
        </Link>
      </div>

      {/* Mobile right: Search Icon */}
      <div className="header-search-mobile">
        <span
          className="search-icon"
          onClick={() => setMobileSearchActive(!mobileSearchActive)}
          style={{ cursor: "pointer" }}
        >
          🔍
        </span>
      </div>

      {/* Navigation */}
      <nav className={`header-nav ${navActive ? "active" : ""}`} ref={navRef}>
        <Link to="/">Home</Link>

        <div className="dropdown" ref={dropdownRef}>
          <button
            className="dropbtn"
            onClick={(e) => {
              e.stopPropagation();
              setMobileDropdownActive(!mobileDropdownActive);
            }}
          >
            Product Category ▾
          </button>

          <div
            className="dropdown-content"
            style={{ display: mobileDropdownActive ? "block" : "" }}
          >
            {categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.name}`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/testimonial">Testimonial</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/gallery">Gallery</Link>

        {/* ✅ MOBILE LOGIN / LOGOUT */}
        <div style={{ marginTop: "10px", padding: "10px" }}>
          {isLoggedIn ? (
            <button
              className="logout-btn"
              onClick={() => {
                handleLogout();
                setNavActive(false);
              }}
              style={{ width: "100%" }}
            >
              Logout
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={() => {
                navigate("/login");
                setNavActive(false);
              }}
              style={{ width: "100%" }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Desktop Search */}
      <div className="header-search desktop-search">
        <div className="search-wrapper">
          <span
            className="search-icon"
            onClick={() => handleSearch(searchTerm)}
            style={{ cursor: "pointer" }}
          >
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
          />

          {showSuggestions && (
            <ul className="search-suggestions" ref={suggestionRef}>
              {suggestions.length > 0 ? (
                suggestions.map((s) => (
                  <li key={s.id} onClick={() => handleSuggestionClick(s.name)}>
                    {s.name}
                  </li>
                ))
              ) : (
                <li>No products found</li>
              )}
            </ul>
          )}
        </div>

        {/* ✅ DESKTOP LOGIN / LOGOUT */}
        <div style={{ marginLeft: "10px" }}>
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
