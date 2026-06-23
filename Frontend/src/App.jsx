import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auctions from "./pages/Auctions";
import AuctionDetails from "./pages/AuctionDetails";
import CreateAuction from "./pages/CreateAuction";
import Dashboard from "./pages/Dashboard";
import Winner from "./pages/Winner";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/auctions"
          element={
            <ProtectedRoute>
              <Auctions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auction/:id"
          element={
            <ProtectedRoute>
              <AuctionDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-auction"
          element={
            <ProtectedRoute>
              <CreateAuction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/winner/:id"
          element={
            <ProtectedRoute>
              <Winner />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;