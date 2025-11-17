// src/components/Certifications.jsx
import React from "react";
import "./OrganicPage.css";
const certifications = [
  {
    id: 1,
    name: "India Organic",
    img: "/certifications/india-organic.png",
  },
  {
    id: 2,
    name: "FSSAI Certified",
    img: "/certifications/fssai.png",
  },
  {
    id: 3,
    name: "Jaivik Bharat",
    img: "/certifications/jaivik-bharat.png",
  },
  {
    id: 4,
    name: "USDA Organic",
    img: "/certifications/usda.png",
  },
  {
    id: 5,
    name: "ISO Certified",
    img: "/certifications/iso.png",
  },
];

export default function Certifications() {
  return (
    <section className="certifications-section">
      <h2>Our Certifications</h2>
      <p className="cert-subtext">
        We are proud to be certified by trusted organic and food safety
        organizations.
      </p>
      <div className="certifications-grid">
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <img src={cert.img} alt={cert.name} />
            <p>{cert.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
