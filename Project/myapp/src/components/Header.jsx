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

  const navRef = useRef(null);
  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close mobile nav
      if (
        navActive &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setNavActive(false);
      }

      // Close mobile dropdown
      if (
        mobileDropdownActive &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setMobileDropdownActive(false);
      }

      // Close mobile search overlay
      if (
        mobileSearchActive &&
        overlayRef.current &&
        !overlayRef.current.contains(e.target) &&
        !e.target.closest(".header-search-mobile")
      ) {
        setMobileSearchActive(false);
        setShowSuggestions(false);
      }

      // Close suggestion dropdown if click outside suggestions
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
      (p) => p.name.toLowerCase() === term.toLowerCase()
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
        p.name.toLowerCase().includes(value.toLowerCase())
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

        {/* Mobile slide-in search overlay */}
        <div
          className={`mobile-search-overlay ${
            mobileSearchActive ? "active" : ""
          }`}
          ref={overlayRef}
        >
          {/* Block 1: Header with label */}
          <div className="mobile-search-header">
            <div className="mobile-search-label">Search Our Site</div>
          </div>

          {/* Block 2: Input + Icon */}
          <div className="mobile-search-input-block">
            <div className="mobile-search-input-wrapper">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
                autoFocus
              />
              <span
                className="search-icon"
                onClick={() => handleSearch(searchTerm)}
              >
                🔍
              </span>
            </div>
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <ul className="search-suggestions" ref={suggestionRef}>
              {suggestions.length > 0 ? (
                suggestions.map((s) => (
                  <li
                    key={s.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(s.name)}
                  >
                    <img
                      src={s.images[0]}
                      alt={s.name}
                      className="suggestion-img"
                    />
                    <div className="suggestion-details">
                      <span className="suggestion-name">{s.name}</span>
                      <span className="suggestion-price">₹{s.price}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="suggestion-item no-suggestion">
                  No products found
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`header-nav ${navActive ? "active" : ""}`} ref={navRef}>
        <Link to="/" onClick={() => setNavActive(false)}>
          Home
        </Link>

        {/* Product Category - Mobile click toggle */}
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
              <Link
                key={cat.id}
                to={`/category/${cat.name}`}
                onClick={() => {
                  setNavActive(false);
                  setMobileDropdownActive(false);
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/testimonial" onClick={() => setNavActive(false)}>
          Testimonial
        </Link>
        <Link to="/about-us" onClick={() => setNavActive(false)}>
          About Us
        </Link>
        <Link to="/gallery" onClick={() => setNavActive(false)}>
          Gallery
        </Link>
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
                  <li
                    key={s.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(s.name)}
                  >
                    <img
                      src={s.images[0]}
                      alt={s.name}
                      className="suggestion-img"
                    />
                    <div className="suggestion-details">
                      <span className="suggestion-name">{s.name}</span>
                      <span className="suggestion-price">₹{s.price}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="suggestion-item no-suggestion">
                  No products found
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
