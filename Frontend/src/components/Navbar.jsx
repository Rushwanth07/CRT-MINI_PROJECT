import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const handleLogout = () => {

    localStorage.removeItem(
      "loggedInUser"
    );

    navigate("/");

    window.location.reload();
  };

  return (
    <nav>

      <div className="logo-section">

        <h2>R&S Auctions</h2>

        <span>
          Bid • Win • Own
        </span>

      </div>

      <ul>

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        {user && (
          <li>
            <Link to="/auctions">
              Auctions
            </Link>
          </li>
        )}

        {user &&
          (
            user.role === "SELLER" ||
            user.role === "BOTH"
          ) && (
          <li>
            <Link to="/create-auction">
              Create Auction
            </Link>
          </li>
        )}

        {user && (
          <li>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
        )}

        {!user ? (
          <>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="user-chip">
               {user.name}
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;