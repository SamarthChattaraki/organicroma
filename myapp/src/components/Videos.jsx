import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import videosData from "../data/videos.json";
import "./OrganicPage.css";

export default function Videos() {
  const containerRef = useRef(null);
  const [visibleIds, setVisibleIds] = useState([]);
  const navigate = useNavigate();
  const isPaused = useRef(false);

  /* ---------- OBSERVE VISIBLE VIDEOS ---------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
      { root: container, threshold: 0.5 }
    );

    const cards = container.querySelectorAll(".video-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 0.7;
    let scrollPos = 0;
    let rafId;

    const scroll = () => {
      if (!scrollContainer || isPaused.current) {
        rafId = requestAnimationFrame(scroll);
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
      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);

    const pause = () => (isPaused.current = true);
    const resume = () => (isPaused.current = false);

    scrollContainer.addEventListener("mouseenter", pause);
    scrollContainer.addEventListener("mouseleave", resume);
    scrollContainer.addEventListener("touchstart", pause);
    scrollContainer.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(rafId);
      scrollContainer.removeEventListener("mouseenter", pause);
      scrollContainer.removeEventListener("mouseleave", resume);
      scrollContainer.removeEventListener("touchstart", pause);
      scrollContainer.removeEventListener("touchend", resume);
    };
  }, []);

  const handleBuyClick = (video) => {
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
            <div key={video.id} data-id={video.id} className="video-card">
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
                />
              ) : (
                <div className="video-placeholder">Loading...</div>
              )}

              <h3>{video.title}</h3>

              <button
                className="video-buy-btn"
                onClick={() => handleBuyClick(video)}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
