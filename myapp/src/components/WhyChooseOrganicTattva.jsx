import React from "react";
import "./OrganicPage.css";

export default function WhyChooseOrganicTattva() {
  const features = [
    {
      icon: "🌾",
      title: "Certified Organic",
      text: "We bring you food sourced directly from organic farms to ensure purity and natural taste.",
    },
    {
      icon: "🧪",
      title: "Chemical-Free",
      text: "No pesticides, preservatives, or additives — just natural, wholesome goodness.",
    },
    {
      icon: "🌱",
      title: "Sustainably Sourced",
      text: "Our products support eco-friendly farming practices that protect the planet.",
    },
    {
      icon: "🏭",
      title: "Nutrient-Rich Processing",
      text: "Processed carefully to preserve essential nutrients and authentic flavour.",
    },
    {
      icon: "🧘",
      title: "Promotes Healthy Living",
      text: "Designed to support wellness, energy, and long-term good health.",
    },
  ];

  return (
    <section className="why-choose">
      <h2>Why Choose Organic Aroma</h2>
      <p className="intro">
        At Organic Aroma, we believe good food creates a good life. Our mission
        is to deliver natural, sustainable, and chemical-free products that keep
        you and the planet healthy.
      </p>

      <div className="feature-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
