import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

      const user = await loginUser(formData);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      navigate("/");

      window.location.reload();

    } catch (error) {

      console.error(error);

      setError("Invalid email or password");

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <h1>R&S Auctions</h1>

        <h2>
          Discover Rare Items.
          <br />
          Bid Smart. Win Big.
        </h2>

        <p>
          Join thousands of buyers and sellers
          participating in secure online auctions.
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

          <h2>Welcome Back</h2>

          <p>Login to continue</p>

          <form onSubmit={handleSubmit}>

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

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button type="submit">
              Login
            </button>

          </form>

          <p className="auth-link">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;