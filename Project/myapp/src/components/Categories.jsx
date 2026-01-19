import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import categoriesData from "../data/categories.json";

import "./OrganicPage.css";

const categories = categoriesData;

export default function Categories() {
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
