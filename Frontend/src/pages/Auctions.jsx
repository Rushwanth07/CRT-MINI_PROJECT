import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAllAuctions } from "../services/auctionService";
import "../styles/auction.css";

function Auctions() {

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {

    try {

      const data = await getAllAuctions();

      setAuctions(data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!user) {

    return <Navigate to="/login" />;

  }

  return (
    <div className="auctions-container">

      <h1>Live Auctions</h1>

      <div className="auction-grid">

        {auctions.length === 0 ? (

          <h2>No Auctions Available</h2>

        ) : (

          auctions.map((auction) => (

            <Link
              key={auction.id}
              to={`/auction/${auction.id}`}
              className="auction-link"
            >

              <div className="auction-card">

                <img
                  src={
                    auction.imageUrl
                      ? auction.imageUrl
                      : "https://via.placeholder.com/400x250"
                  }
                  alt={auction.title}
                  className="auction-image"
                />

                <div
                  style={{
                    padding: "20px"
                  }}
                >

                  <h3>{auction.title}</h3>

                  <p>{auction.description}</p>

                  <p>
                    <strong>Current Price:</strong>
                    {" "}
                    ₹{auction.currentPrice}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    {" "}
                    <span
                      style={{
                        color:
                          auction.status === "ACTIVE"
                            ? "#16a34a"
                            : "#dc2626",
                        fontWeight: "bold"
                      }}
                    >
                      {auction.status}
                    </span>
                  </p>

                </div>

              </div>

            </Link>

          ))

        )}

      </div>

    </div>
  );
}

export default Auctions;