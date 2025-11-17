// OrganicMandyaPage.jsx

import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaSearch,
} from "react-icons/fa";
import "./OrganicPage.css";
import AboutUsPage from "./AboutUsPage";
import TestimonialPage from "./TestimonialPage";
import GalleryPage from "./GalleryPage";
import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";
import slidesData from "../data/slides.json";
import videosData from "../data/videos.json";
import Certifications from "./Certifications";
import WhyChooseOrganicTattva from "./WhyChooseOrganicTattva";
import OrderModal from "../components/OrderModal";

// Sample slides
const sampleSlides = slidesData;

// Products
const allProducts = productsData;

// Categories
const categories = categoriesData;

// ================= Header =================
export function Header() {
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

// ================= Hero =================
function Hero() {
  const [current, setCurrent] = useState(0);
  const delay = 4000;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sampleSlides.length);
    }, delay);

    return () => clearInterval(interval);
  }, []);

  const slide = sampleSlides[current];

  // handle button click
  const handleClick = (slide) => {
    if (slide.category) {
      navigate(`/category/${slide.category}`);
    }
  };

  return (
    <section className="hero-slider">
      <div className="hero-card">
        <img src={slide.image} alt={slide.title} />

        {/* Single button only */}
        <button className="hero-btn" onClick={() => handleClick(slide)}>
          {slide.cta.label}
        </button>
      </div>

      {/* Dots navigation */}
      <div className="hero-dots">
        {sampleSlides.map((_, index) => (
          <span
            key={index}
            className={`hero-dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

// ================= Categories =================

function Categories() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const isPaused = useRef(false); // ✅ track pause state

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const getCardWidth = () => {
      const card = container.querySelector(".category-card");
      if (!card) return 0;
      const style = window.getComputedStyle(container);
      const gap = parseInt(style.gap, 10) || 20;
      return card.offsetWidth + gap;
    };

    const startAutoSlide = () => {
      clearInterval(intervalRef.current);
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      intervalRef.current = setInterval(() => {
        if (isPaused.current) return; // ✅ Skip if hovered/touched
        const step = getCardWidth();
        if (!step) return;
        let next = Math.round(container.scrollLeft + step);
        if (next >= maxScroll) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollTo({ left: next, behavior: "smooth" });
        }
      }, 2500);
    };

    startAutoSlide();

    // ✅ Pause/resume on hover or touch
    const handleMouseEnter = () => (isPaused.current = true);
    const handleMouseLeave = () => (isPaused.current = false);
    const handleTouchStart = () => (isPaused.current = true);
    const handleTouchEnd = () => (isPaused.current = false);

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      clearInterval(intervalRef.current);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // ✅ Arrow scroll (unchanged)
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(".category-card");
    if (!card) return;
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap, 10) || 20;
    container.scrollBy({ left: -(card.offsetWidth + gap), behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(".category-card");
    if (!card) return;
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap, 10) || 20;
    container.scrollBy({ left: card.offsetWidth + gap, behavior: "smooth" });
  };

  return (
    <section className="categories" style={{ position: "relative" }}>
      <h2>Shop by Categories</h2>

      <span className="category-arrow arrow-left" onClick={scrollLeft}>
        &#8249;
      </span>
      <span className="category-arrow arrow-right" onClick={scrollRight}>
        &#8250;
      </span>

      <div className="category-scroll" ref={scrollRef}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            <img src={cat.img} alt={cat.name} />
            <h3>{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

// ================= Products =================

function Products({ showPopularOnly = false }) {
  const { categoryName } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("search") || "";
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Filter products
  const filtered = useMemo(() => {
    let result = allProducts;

    if (showPopularOnly) result = result.filter((p) => p.popular);
    else if (categoryName)
      result = result.filter(
        (p) => p.tag.toLowerCase() === categoryName.toLowerCase()
      );

    if (searchQuery)
      result = result.filter(
        (p) => p.name.toLowerCase() === searchQuery.toLowerCase()
      );

    return result;
  }, [categoryName, searchQuery, showPopularOnly]);

  // CSS class names
  const gridClass = showPopularOnly ? "product-grid" : "category-grid";
  const sectionClass = showPopularOnly
    ? "products popular-section"
    : "products category-section";

  const displayCategoryName =
    categoryName && categoryName.length > 0
      ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
      : "";

  // ✅ Auto-slide with pause/resume on hover & touch
  useEffect(() => {
    if (!showPopularOnly) return;
    const container = scrollRef.current;
    if (!container) return;

    const getCardWidth = () => {
      const card = container.querySelector(".product-card");
      if (!card) return 0;
      const style = window.getComputedStyle(container);
      const gap = parseInt(style.gap, 10) || 20;
      return card.offsetWidth + gap;
    };

    let intervalId = null;

    const startAutoSlide = () => {
      if (intervalId) clearInterval(intervalId);
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      intervalId = setInterval(() => {
        const step = getCardWidth();
        if (!step) return;
        let next = Math.round(container.scrollLeft + step);
        if (next >= maxScroll) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollTo({ left: next, behavior: "smooth" });
        }
      }, 2500);
    };

    const stopAutoSlide = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    };

    // Start auto-slide
    startAutoSlide();

    // ✅ Pause/resume on hover (desktop)
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);

    // ✅ Pause/resume on touch (mobile)
    container.addEventListener("touchstart", stopAutoSlide, { passive: true });
    container.addEventListener("touchend", startAutoSlide, { passive: true });

    // ✅ Pause when user manually scrolls
    let scrollTimer;
    const handleScroll = () => {
      stopAutoSlide();
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(startAutoSlide, 1500);
    };
    container.addEventListener("scroll", handleScroll);

    // 🧩 Restart when resized or orientation changes
    const handleResize = () => startAutoSlide();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Cleanup
    return () => {
      stopAutoSlide();
      container.removeEventListener("mouseenter", stopAutoSlide);
      container.removeEventListener("mouseleave", startAutoSlide);
      container.removeEventListener("touchstart", stopAutoSlide);
      container.removeEventListener("touchend", startAutoSlide);
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [showPopularOnly]);

  // Manual scroll with arrows
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(".product-card");
    if (!card) return;
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap, 10) || 20;
    container.scrollBy({
      left: -(card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(".product-card");
    if (!card) return;
    const style = window.getComputedStyle(container);
    const gap = parseInt(style.gap, 10) || 20;
    container.scrollBy({
      left: card.offsetWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section className={sectionClass} style={{ position: "relative" }}>
      <h2>
        {showPopularOnly
          ? "Popular Products"
          : categoryName
          ? `${displayCategoryName} Products`
          : "All Products"}
      </h2>

      {/* Left Arrow */}
      {showPopularOnly && filtered.length > 0 && (
        <span className="scroll-btn left" onClick={scrollLeft}>
          &#8249;
        </span>
      )}

      {/* Product Grid */}
      <div className={gridClass} ref={showPopularOnly ? scrollRef : null}>
        {filtered.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filtered.map((product) => (
            <article
              key={product.id}
              className={`product-card ${
                searchQuery &&
                product.name.toLowerCase() === searchQuery.toLowerCase()
                  ? "highlighted"
                  : ""
              }`}
              onClick={() =>
                navigate(`/product/${encodeURIComponent(product.name)}`)
              }
              style={{ cursor: "pointer", textAlign: "center" }}
            >
              <img
                src={
                  Array.isArray(product.images)
                    ? product.images[0]
                    : product.img
                }
                alt={product.name}
                loading="lazy"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Right Arrow */}
      {showPopularOnly && filtered.length > 0 && (
        <span className="scroll-btn right" onClick={scrollRight}>
          &#8250;
        </span>
      )}
    </section>
  );
}

// ================= Product Detail Page =================

function ProductDetailPage() {
  const { productName } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("description");
  const [mainMedia, setMainMedia] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // ⭐ ADD THIS STATE
  const [showModal, setShowModal] = useState(false);

  const product = allProducts.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product) return <p>Product not found!</p>;

  const images = Array.isArray(product.images)
    ? product.images
    : product.img
    ? [product.img]
    : [];

  const videoUrl = product.video || null;

  useEffect(() => {
    if (images.length > 0) {
      setMainMedia({ type: "image", src: images[0] });
    } else if (videoUrl) {
      setMainMedia({ type: "video", src: videoUrl });
    }
  }, [images, videoUrl]);

  // ❌ REMOVE ALERT — we will show modal instead
  const handleBuy = () => {
    setShowModal(true);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      <Header />

      <section className="product-detail">
        {/* Left: Product Media */}
        <div className="product-images">
          {mainMedia && mainMedia.type === "image" && (
            <img src={mainMedia.src} alt={product.name} />
          )}
          {mainMedia && mainMedia.type === "video" && (
            <video
              src={mainMedia.src}
              controls
              autoPlay
              loop
              muted
              style={{ width: "100%", borderRadius: "10px" }}
            />
          )}

          <div className="image-thumbnails">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                className={
                  mainMedia?.type === "image" && mainMedia?.src === img
                    ? "active-thumb"
                    : ""
                }
                onClick={() => setMainMedia({ type: "image", src: img })}
              />
            ))}

            {videoUrl && (
              <div
                className={`video-thumb ${
                  mainMedia?.type === "video" ? "active-thumb" : ""
                }`}
                onClick={() => setMainMedia({ type: "video", src: videoUrl })}
              >
                🎥 Video
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info-right">
          <h1>{product.name}</h1>
          <p className="price">₹ {product.price.toFixed(2)}</p>

          {product.qty && <p className="product-qty">Qty: {product.qty}</p>}

          <div className="quantity-selector">
            <button onClick={decrement}>-</button>
            <span>{quantity}</span>
            <button onClick={increment}>+</button>
          </div>

          {/* ⭐ Buy Buttons */}
          <div className="buy-section">
            {/* OPEN MODAL */}
            <button className="btn-buy" onClick={handleBuy}>
              Buy Now
            </button>
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>

          {/* Share Section */}
          <div className="share-section">
            <p className="share-label">Share this product on:</p>
            <div className="share-icons">
              <a
                href={`https://wa.me/?text=Check out this product: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              <a
                href={`https://www.instagram.com/?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="product-tabs-section">
          <div className="product-tabs">
            <div className="tab-buttons">
              {product.description && (
                <button
                  className={activeTab === "description" ? "active" : ""}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
              )}
              <button
                className={activeTab === "benefits" ? "active" : ""}
                onClick={() => setActiveTab("benefits")}
              >
                Benefits
              </button>
              {product.usage && (
                <button
                  className={activeTab === "usage" ? "active" : ""}
                  onClick={() => setActiveTab("usage")}
                >
                  Usage
                </button>
              )}
              {product.ingredients && (
                <button
                  className={activeTab === "ingredients" ? "active" : ""}
                  onClick={() => setActiveTab("ingredients")}
                >
                  Ingredients
                </button>
              )}
            </div>

            <div className="tab-content">
              {activeTab === "description" && <p>{product.description}</p>}
              {activeTab === "benefits" && <p>{product.benefits}</p>}
              {activeTab === "usage" && <p>{product.usage}</p>}
              {activeTab === "ingredients" && <p>{product.ingredients}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="related-products-section">
        <h2>Related Products</h2>
        <div className="related-products-grid">
          {allProducts
            .filter(
              (p) =>
                p.tag.toLowerCase() === product.tag.toLowerCase() &&
                p.name.toLowerCase() !== product.name.toLowerCase()
            )
            .slice(0, 4)
            .map((related) => (
              <div
                key={related.id}
                className="related-card"
                onClick={() =>
                  navigate(`/product/${encodeURIComponent(related.name)}`)
                }
              >
                <img
                  src={
                    Array.isArray(related.images)
                      ? related.images[0]
                      : related.img
                  }
                  alt={related.name}
                />
                <h3>{related.name}</h3>
              </div>
            ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* ⭐ ADD THIS ORDER MODAL ⭐ */}
      <OrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        quantity={quantity}
      />
    </>
  );
}
// ================= Videos =================
function Videos() {
  const containerRef = useRef(null);
  const [visibleIds, setVisibleIds] = useState([]);
  const navigate = useNavigate();
  const isPaused = useRef(false); // ✅ Track pause state

  // Detect visible cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting) {
            setVisibleIds((prev) => [...new Set([...prev, id])]);
          } else {
            setVisibleIds((prev) => prev.filter((vid) => vid !== id));
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    const cards = containerRef.current.querySelectorAll(".video-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Continuous auto-scroll (with pause)
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 0.7;
    let scrollPos = 0;
    let animationFrameId;

    const scroll = () => {
      if (!scrollContainer || isPaused.current) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      scrollPos += scrollSpeed;
      if (
        scrollPos >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollPos = 0;
      }

      scrollContainer.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // ✅ Pause/resume events
    const handleMouseEnter = () => (isPaused.current = true);
    const handleMouseLeave = () => (isPaused.current = false);
    const handleTouchStart = () => (isPaused.current = true);
    const handleTouchEnd = () => (isPaused.current = false);

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("touchstart", handleTouchStart);
    scrollContainer.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleClick = (video) => {
    navigate(`/product/${encodeURIComponent(video.title)}`);
  };

  return (
    <section className="videos">
      <h2>Our Video Gallery</h2>
      <div className="video-scroll" ref={containerRef}>
        {videosData.map((video) => {
          const videoId = video.url.split("/embed/")[1];
          const autoplayUrl = `${video.url}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;

          return (
            <div
              key={video.id}
              data-id={video.id}
              className="video-card"
              onClick={() => handleClick(video)}
              style={{ cursor: "pointer" }}
            >
              {visibleIds.includes(video.id.toString()) ? (
                <iframe
                  width="320"
                  height="200"
                  src={autoplayUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="video-frame"
                ></iframe>
              ) : (
                <div className="video-placeholder">Loading...</div>
              )}
              <h3>{video.title}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ================= Footer =================
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo + Contact Info */}
        <div className="footer-logo-contact">
          <div className="footer-logo-container">
            <img
              src="/logo.jpg"
              alt="OrganicMarket Logo"
              className="footer-logo"
            />
          </div>
          <div className="footer-contact">
            <p>132, shop name, name, name,</p>
            <p>City - 394150 Karnataka, India</p>
            <p>
              Email:{" "}
              <a href="mailto:info@girorganic.com">info@girorganic.com</a>
            </p>
            <p>
              Phone: <a href="tel:+919099909453">+91-9099909453</a>
            </p>

            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/testimonial">Testimonial</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

// ================= WhatsApp =================
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/7259323346"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

// ================= Pages =================
function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <Products showPopularOnly={true} />
      <WhyChooseOrganicTattva />
      <Certifications />
      <Videos />

      <Footer />
      <WhatsAppButton />
    </>
  );
}

function CategoryPage() {
  return (
    <>
      <Header />
      <Products />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

// Main export
export default function OrganicPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productName" element={<ProductDetailPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
}
