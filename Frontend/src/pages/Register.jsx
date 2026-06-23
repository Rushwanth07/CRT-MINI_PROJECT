import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";
import { registerUser } from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "BIDDER"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      await registerUser(formData);

      navigate("/login");

    } catch (error) {

      console.error(error);

      setError(
        "Registration failed. Try another email."
      );

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <h1>R&S Auctions</h1>

        <h2>
          Create Your Account
        </h2>

        <p>
          Start selling, bidding and managing
          auctions in one powerful platform.
        </p>

        <div className="auth-stats">

          <div>
            <h3>500+</h3>
            <span>Auctions</span>
          </div>

          <div>
            <h3>10K+</h3>
            <span>Users</span>
          </div>

          <div>
            <h3>99%</h3>
            <span>Success</span>
          </div>

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account</h2>

          <p>Join R&S Auctions Today</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="BIDDER">BIDDER</option>
              <option value="SELLER">SELLER</option>
              <option value="BOTH">BOTH</option>
            </select>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button type="submit">
              Register
            </button>

          </form>

          <p className="auth-link">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;