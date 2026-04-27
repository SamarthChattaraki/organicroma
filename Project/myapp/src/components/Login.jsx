import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrganicPage.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ IMPORTANT (for cookies)
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ✅ CHANGED (no token now)
      if (data.success) {
        alert("Login successful ✅");
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server not running ⚠️");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
