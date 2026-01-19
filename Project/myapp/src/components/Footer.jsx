import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import categoriesData from "../data/categories.json";
import "./OrganicPage.css";

const categories = categoriesData;

export default function Footer() {
  const [openQuick, setOpenQuick] = useState(false);
  const [openPolicies, setOpenPolicies] = useState(false);
  const [openCities, setOpenCities] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* LEFT */}
        <div className="footer-logo-contact">
          <img src="/logo.jpg" alt="Logo" className="footer-logo" />

          <div className="footer-contact">
            <p>132, Shop Name, Market Road</p>
            <p>City - 394150 Karnataka, India</p>
            <p>
              Email:{" "}
              <a href="mailto:info@girorganic.com">info@girorganic.com</a>
            </p>
            <p>
              Phone: <a href="tel:+919099909453">+91-9099909453</a>
            </p>
          </div>

          <div className="footer-social">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* EXPLORE */}
        <div className="footer-section">
          <div
            className="footer-dropdown-title"
            onClick={() => setOpenQuick(!openQuick)}
          >
            <h4>Explore</h4>
            <span className="arrow">{openQuick ? "▲" : "▼"}</span>
          </div>

          <ul className={`footer-links ${openQuick ? "show" : ""}`}>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/category/${cat.name}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* POLICIES */}
        <div className="footer-section">
          <div
            className="footer-dropdown-title"
            onClick={() => setOpenPolicies(!openPolicies)}
          >
            <h4>Policies</h4>
            <span className="arrow">{openPolicies ? "▲" : "▼"}</span>
          </div>

          <ul className={`footer-links ${openPolicies ? "show" : ""}`}>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/testimonial">Testimonial</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/refund-policy">Refund Policy</Link>
            </li>
          </ul>
        </div>

        {/* CITIES */}
        <div className="footer-section">
          <div
            className="footer-dropdown-title"
            onClick={() => setOpenCities(!openCities)}
          >
            <h4>Cities We Serve</h4>
            <span className="arrow">{openCities ? "▲" : "▼"}</span>
          </div>

          <ul className={`footer-links ${openCities ? "show" : ""}`}>
            <li>Bangalore</li>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>Hyderabad</li>
            <li>Chennai</li>
            <li>Delhi NCR</li>
            <li>Ahmedabad</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Organic Aroma. All Rights Reserved.
      </div>
    </footer>
  );
}
