import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import slidesData from "../data/slides.json";
import "./OrganicPage.css";

const sampleSlides = slidesData;

export default function Hero() {
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

  const handleClick = (slide) => {
    if (slide.category) {
      navigate(`/category/${slide.category}`);
    }
  };

  return (
    <section className="hero-slider">
      <div className="hero-card">
        <img src={slide.image} alt={slide.title} />

        <button className="hero-btn" onClick={() => handleClick(slide)}>
          {slide.cta.label}
        </button>
      </div>

      {/* DOTS */}
      <div className="hero-dots">
        {sampleSlides.map((_, index) => (
          <span
            key={index}
            className={`hero-dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
