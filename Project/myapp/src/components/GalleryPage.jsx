import React, { useState } from "react";
import { WhatsAppButton } from "./OrganicPage";
import "./OrganicPage.css";
import Header from "./Header";
import Footer from "./Footer";

// 13 sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Find out how Desi Ghee & Gir Cow Ghee are not the same",
    description:
      "Many times we come across terms that lure us into buying things that are not necessarily ideal for our health...",
    date: "May 23, 2022",
    author: "Name",
    thumbnail: "/image2.jpg",
  },
  {
    id: 2,
    title: "Why is A2 Milk Easy to Digest?",
    description:
      "Milk is regarded as a complete food because it is rich in proteins, carbohydrates, fats, vitamins & more...",
    date: "May 23, 2022",
    author: "Name",
    thumbnail: "https://girorganic.com/cdn/shop/articles/blog2.jpg",
  },
  {
    id: 3,
    title: "Cold Pressed Oils - The Healthy Way Forward",
    description:
      "We’re living in times when pandemics exist and it is high time for us to prioritize healthy eating habits...",
    date: "May 23, 2022",
    author: "Name",
    thumbnail: "https://girorganic.com/cdn/shop/articles/blog3.jpg",
  },
  {
    id: 4,
    title: "Understanding Organic Farming",
    description:
      "Organic farming is a holistic production management system that promotes and enhances agro-ecosystem health...",
    date: "June 1, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Organic+Farming",
  },
  {
    id: 5,
    title: "Health Benefits of A2 Milk",
    description:
      "A2 milk contains protein A2 beta-casein which is easier for the human body to digest...",
    date: "June 5, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=A2+Milk",
  },
  {
    id: 6,
    title: "Top 5 Uses of Ghee in Indian Cooking",
    description:
      "Ghee has been used in India for centuries. Explore its versatile uses in traditional cooking...",
    date: "June 10, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Ghee+Uses",
  },
  {
    id: 7,
    title: "How to Identify Pure Desi Ghee",
    description:
      "Learn simple ways to identify pure Desi Ghee and ensure you consume authentic products...",
    date: "June 15, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Pure+Ghee",
  },
  {
    id: 8,
    title: "Benefits of Cold-Pressed Oils",
    description:
      "Cold-pressed oils retain more nutrients, antioxidants, and healthy fats than refined oils...",
    date: "June 20, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Cold+Pressed+Oils",
  },
  {
    id: 9,
    title: "Farm-to-Table: Freshness Matters",
    description:
      "Understand the importance of consuming farm-fresh produce for a healthier lifestyle...",
    date: "June 25, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Farm+to+Table",
  },
  {
    id: 10,
    title: "Organic Dairy: Why Choose A2 Milk?",
    description:
      "Organic dairy farming ensures better quality milk with higher nutritional value...",
    date: "July 1, 2022",
    author: "Dhaval Maru",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Organic+Dairy",
  },
  {
    id: 11,
    title: "Healthy Indian Breakfast Options",
    description:
      "Discover nutritious breakfast ideas that include organic ingredients for a strong start to your day...",
    date: "July 5, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Healthy+Breakfast",
  },
  {
    id: 12,
    title: "Top 5 Benefits of Organic Ghee",
    description:
      "Organic ghee improves digestion, boosts immunity, and adds rich flavor to your meals...",
    date: "July 10, 2022",
    author: "Name",
    thumbnail: "https://via.placeholder.com/400x260.png?text=Organic+Ghee",
  },
  {
    id: 13,
    title: "Sustainable Farming Practices",
    description:
      "Learn how sustainable practices protect the environment and produce healthier crops...",
    date: "July 15, 2022",
    author: "Name",
    thumbnail:
      "https://via.placeholder.com/400x260.png?text=Sustainable+Farming",
  },
];

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  return (
    <>
      <Header />

      <div className="blog-page">
        <h1 className="blog-title">Our Blog</h1>

        <div className="blog-grid">
          {currentPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-thumbnail">
                <img src={post.thumbnail} alt={post.title} />
              </div>
              <div className="blog-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="blog-meta">
                  {post.date} | {post.author}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="blog-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </>
  );
}
