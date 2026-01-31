import React, { useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import productsData from "../data/products.json";
import "./OrganicPage.css";

const allProducts = productsData;

export default function Products({ showPopularOnly = false }) {
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
