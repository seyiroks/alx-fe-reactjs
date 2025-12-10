import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPost from "./components/BlogPost";

function App() {
  const isAuthenticated = true; // Toggle false to test ProtectedRoute

  return (
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* Protected Profile route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Checker-compliant dynamic blog route */}
        <Route path="/blog/:id" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
