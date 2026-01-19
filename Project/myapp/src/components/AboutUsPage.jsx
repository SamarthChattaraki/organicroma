// AboutUsPage.jsx
import React from "react";
import { WhatsAppButton } from "./OrganicPage"; // reuse existing components
import "./OrganicPage.css";
import Header from "./Header";
import Footer from "./Footer";

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="aboutus-page">
        <section className="aboutus-hero">
          <h1>About OrganicMarket</h1>
          <p>
            We are committed to bringing the finest organic products directly
            from farmers to your home. Our mission is to promote healthy living
            and support sustainable farming.
          </p>
          <img src="" alt="Organic Farming" /> {/* Blank image */}
        </section>

        <section className="aboutus-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality First</h3>
              <p>
                Every product is carefully curated for purity, taste, and
                nutrition.
              </p>
            </div>
            <div className="value-card">
              <h3>Farmer Support</h3>
              <p>
                We work directly with farmers to ensure fair pricing and
                sustainable practices.
              </p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>
                From sourcing to delivery, we maintain clear communication and
                product labeling.
              </p>
            </div>
            <div className="value-card">
              <h3>Health & Wellness</h3>
              <p>
                Our mission is to help you live a healthier life through organic
                choices.
              </p>
            </div>
          </div>
        </section>

        <section className="aboutus-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="" alt="Team Member" /> {/* Blank image */}
              <h4>Name</h4>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img src="" alt="Team Member" /> {/* Blank image */}
              <h4>Name</h4>
              <p>Operations Head</p>
            </div>
            <div className="team-member">
              <img src="" alt="Team Member" /> {/* Blank image */}
              <h4>Name</h4>
              <p>Nutritionist</p>
            </div>
          </div>
        </section>

        <section className="aboutus-contact">
          <h2>Contact Us</h2>
          <p>📧 support@organicmarket.com</p>
          <p>📞 +91 9590922000</p>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
