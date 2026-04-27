import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include", // ✅ send cookie
    })
      .then((res) => {
        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch(() => setIsAuth(false));
  }, []);

  // ⏳ loading state
  if (isAuth === null) return <p>Loading...</p>;

  // ❌ not logged in
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  // ✅ logged in
  return children;
}

export default ProtectedRoute;
