// TestimonialPage.jsx
import React from "react";
import { Header, Footer, WhatsAppButton } from "./OrganicPage"; // reuse existing components
import "./OrganicPage.css";

export default function TestimonialPage() {
  const testimonials = [
    {
      id: 1,
      name: "Name",
      message:
        "I love the organic products from OrganicMarket! The quality is unmatched and delivery is fast.",
      type: "text",
    },
    {
      id: 2,
      name: "Name",
      message:
        "OrganicMarket has completely changed how I shop for groceries. Healthy and fresh!",
      type: "text",
    },
    {
      id: 3,
      name: "Name",
      message:
        "I enjoy the wide variety of organic oils and snacks. Customer support is amazing too!",
      type: "text",
    },
    {
      id: 4,
      name: "YouTube Review",
      //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      type: "video",
    },
    {
      id: 5,
      name: "YouTube Review 2",
      //   videoUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
      type: "video",
    },
  ];

  return (
    <>
      <Header />
      <main className="testimonial-page">
        <section className="testimonial-hero">
          <h1>What Our Customers Say</h1>
          <p>
            Discover feedback from our happy customers—text and video reviews.
          </p>
        </section>

        <section className="testimonial-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              {t.type === "text" ? (
                <>
                  <p className="testimonial-message">"{t.message}"</p>
                  <h4 className="testimonial-name">- {t.name}</h4>
                </>
              ) : (
                <div className="testimonial-video">
                  <iframe
                    width="100%"
                    height="200"
                    src={t.videoUrl}
                    title="User Testimonial Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h4 className="testimonial-name">{t.name}</h4>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
