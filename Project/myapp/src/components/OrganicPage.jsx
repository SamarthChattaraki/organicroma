import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";

import "./OrganicPage.css";
import AboutUsPage from "./AboutUsPage";
import TestimonialPage from "./TestimonialPage";
import GalleryPage from "./GalleryPage";
import Footer from "./Footer";
import Videos from "./Videos";
import Certifications from "./Certifications";
import WhyChooseOrganicTattva from "./WhyChooseOrganicTattva";
import ProductDetailPage from "./ProductDetailPage";
import Categories from "./Categories";
import Products from "./Products";
import Header from "./Header";
import Hero from "./Hero";

// ✅ NEW IMPORTS
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

// ================= WhatsApp =================

export function WhatsAppButton({ product }) {
  const message = product
    ? `Hi, I want to buy ${product.name} (₹${product.price}). Link: ${window.location.href}`
    : "Hello, I want to know more about your products.";

  return (
    <a
      href={`https://wa.me/7259323346?text=${encodeURIComponent(message)}`}
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

// ================= MAIN =================
export default function OrganicPage() {
  return (
    <Router>
      <Routes>
        {/* ✅ PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:categoryName"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:productName"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <AboutUsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/testimonial"
          element={
            <ProtectedRoute>
              <TestimonialPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <GalleryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
