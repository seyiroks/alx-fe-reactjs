import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import Post from "./pages/Post";
import ProtectedRoute from "./components/ProtectedRoute";

function Navbar() {
  return (
    <nav style={{ marginBottom: "20px", textAlign: "center" }}>
      <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
      <Link to="/profile" style={{ margin: "0 10px" }}>Profile</Link>
      <Link to="/profile/details" style={{ margin: "0 10px" }}>Profile Details</Link>
      <Link to="/profile/settings" style={{ margin: "0 10px" }}>Profile Settings</Link>
      <Link to="/post/1" style={{ margin: "0 10px" }}>Post 1</Link>
      <Link to="/post/42" style={{ margin: "0 10px" }}>Post 42</Link>
    </nav>
  );
}

function App() {
  const isAuthenticated = true; // Toggle to false to test ProtectedRoute

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Profile Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Dynamic Post Route */}
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
