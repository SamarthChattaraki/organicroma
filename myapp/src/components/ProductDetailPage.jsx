import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

import productsData from "../data/products.json";
import { WhatsAppButton } from "./OrganicPage";
import OrderModal from "./OrderModal";
import Header from "./Header";
import Footer from "./Footer";

import "./OrganicPage.css";

const allProducts = productsData;

export default function ProductDetailPage() {
  const { productName } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("description");
  const [mainMedia, setMainMedia] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = allProducts.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase(),
  );

  if (!product) return <p>Product not found!</p>;

  const images = Array.isArray(product.images)
    ? product.images
    : product.img
    ? [product.img]
    : [];

  const videoUrl = product.video || null;
  const totalSlides = images.length + (videoUrl ? 1 : 0);

  // INITIAL LOAD
  useEffect(() => {
    if (images.length > 0) {
      setMainMedia({ type: "image", src: images[0] });
      setCurrentIndex(0);
    } else if (videoUrl) {
      setMainMedia({ type: "video", src: videoUrl });
      setCurrentIndex(images.length);
    }
  }, [images, videoUrl]);

  const handleBuy = () => setShowModal(true);

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // NEXT MEDIA
  const handleNext = () => {
    const next = (currentIndex + 1) % totalSlides;
    setCurrentIndex(next);

    if (next < images.length) {
      setMainMedia({ type: "image", src: images[next] });
    } else {
      setMainMedia({ type: "video", src: videoUrl });
    }
  };

  // PREV MEDIA
  const handlePrev = () => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    setCurrentIndex(prev);

    if (prev < images.length) {
      setMainMedia({ type: "image", src: images[prev] });
    } else {
      setMainMedia({ type: "video", src: videoUrl });
    }
  };

  /* ===============================================================
     AUTO-SCROLL RELATED PRODUCTS — BULLETPROOF INFINITE SCROLL
  ================================================================ */
  const relatedRef = useRef(null);

  useEffect(() => {
    const slider = relatedRef.current;
    if (!slider || relatedProducts.length === 0) return;

    const scrollDistance = slider.scrollWidth / 2;
    let rafId;
    let lastTime = performance.now();
    let accumulatedDelta = 0;
    const baseSpeed = 0.15; // Slightly slower for smoothness

    const scroll = (currentTime) => {
      const deltaTime = Math.min(currentTime - lastTime, 100); // Cap delta to prevent jumps
      lastTime = currentTime;

      accumulatedDelta += baseSpeed * deltaTime;
      const moveDistance = Math.floor(accumulatedDelta);
      accumulatedDelta -= moveDistance;

      if (moveDistance > 0) {
        const newPos = (slider.scrollLeft + moveDistance) % scrollDistance;
        slider.scrollLeft = newPos < 0 ? scrollDistance + newPos : newPos;
      }

      rafId = requestAnimationFrame(scroll);
    };

    rafId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(rafId);
  }, []); // Empty deps to match original behavior

  // FILTER RELATED
  const relatedProducts = allProducts.filter(
    (p) =>
      p.tag.toLowerCase() === product.tag.toLowerCase() &&
      p.name.toLowerCase() !== product.name.toLowerCase(),
  );

  // DUPLICATE LIST FOR INFINITE LOOP
  const infiniteList = [...relatedProducts, ...relatedProducts];

  return (
    <>
      <Header />

      <section className="product-detail">
        {/* LEFT IMAGE/VIDEO AREA */}
        <div className="product-images" style={{ position: "relative" }}>
          {totalSlides > 1 && (
            <button className="prod-arrow left" onClick={handlePrev}>
              ◀
            </button>
          )}

          {mainMedia?.type === "image" && (
            <img
              src={mainMedia.src}
              alt={product.name}
              className="main-media"
            />
          )}

          {mainMedia?.type === "video" && (
            <video
              src={mainMedia.src}
              controls
              autoPlay
              loop
              muted
              className="main-media"
            />
          )}

          {totalSlides > 1 && (
            <button className="prod-arrow right" onClick={handleNext}>
              ▶
            </button>
          )}

          {/* THUMBNAILS */}
          <div className="image-thumbnails">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                className={
                  mainMedia?.type === "image" && mainMedia?.src === img
                    ? "active-thumb"
                    : ""
                }
                onClick={() => {
                  setMainMedia({ type: "image", src: img });
                  setCurrentIndex(idx);
                }}
              />
            ))}

            {videoUrl && (
              <div
                className={`video-thumb ${
                  mainMedia?.type === "video" ? "active-thumb" : ""
                }`}
                onClick={() => {
                  setMainMedia({ type: "video", src: videoUrl });
                  setCurrentIndex(images.length);
                }}
              >
                🎥 Video
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE INFO */}
        <div className="product-info-right">
          <h1>{product.name}</h1>
          <p className="price">₹ {product.price.toFixed(2)}</p>

          {product.qty && <p className="product-qty">Qty: {product.qty}</p>}

          <div className="quantity-selector">
            <button onClick={decrement}>-</button>
            <span>{quantity}</span>
            <button onClick={increment}>+</button>
          </div>

          <div className="buy-section">
            <button className="btn-buy" onClick={handleBuy}>
              Buy Now
            </button>
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>

          <div className="share-section">
            <p className="share-label">Share this product on:</p>
            <div className="share-icons">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  window.location.href,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>

              {/* Instagram – only opens & copies link */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Product link copied! Paste it in Instagram.");
                }}
              >
                <FaInstagram />
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        {/* TABS */}
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

      {/* ======================================================
          RELATED PRODUCTS — BULLETPROOF INFINITE SMOOTH SLIDER
      ====================================================== */}
      <section className="related-products-section">
        <h2>Related Products</h2>

        <div className="related-slider-container">
          <div
            className="related-slider"
            ref={relatedRef}
            style={{
              scrollBehavior: "auto",
              willChange: "scroll-position",
            }}
          >
            {infiniteList.map((related, index) => (
              <div
                key={index}
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
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      <OrderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        quantity={quantity}
      />
    </>
  );
}
