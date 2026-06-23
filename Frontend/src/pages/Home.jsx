import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAuctions } from "../services/auctionService";
import "../styles/home.css";

function Home() {

  const [auctions, setAuctions] =
    useState([]);

  useEffect(() => {

    fetchAuctions();

  }, []);

  const fetchAuctions = async () => {

    try {

      const data =
        await getAllAuctions();

      setAuctions(data);

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <h1>
            Discover Rare Items.
            <br />
            Bid Smart.
            <br />
            Win Big.
          </h1>

          <p>
            Join the fastest growing online
            auction marketplace.
          </p>

          <div className="hero-buttons">

            <Link to="/auctions">

              <button className="primary-btn">
                Explore Auctions
              </button>

            </Link>

          </div>

        </div>

      </section>

      <section className="stats-section">

        <div className="stat-card">

          <h2>
            {auctions.length}
          </h2>

          <p>
            Active Auctions
          </p>

        </div>

        <div className="stat-card">

          <h2>10K+</h2>

          <p>
            Registered Users
          </p>

        </div>

        <div className="stat-card">

          <h2>99%</h2>

          <p>
            Customer Satisfaction
          </p>

        </div>

      </section>

      <section className="featured-section">

        <h2>
          Featured Live Auctions
        </h2>

        <div className="auction-grid">

          {auctions
            .slice(0, 4)
            .map((auction) => (

              <Link
                key={auction.id}
                to={`/auction/${auction.id}`}
                className="auction-link"
              >

                <div
                  className="auction-card"
                >

                  <img
                    src={
                      auction.imageUrl
                    }
                    alt={
                      auction.title
                    }
                  />

                  <h3>
                    {auction.title}
                  </h3>

                  <p>
                    Current Bid:
                    ₹
                    {
                      auction.currentPrice
                    }
                  </p>

                </div>

              </Link>

            ))}

        </div>

      </section>

      <section className="how-section">

        <h2>
          Why Choose
          R&S Auctions?
        </h2>

        <div className="steps-container">

          <div className="step-card">

            <div className="step-number">
              ✓
            </div>

            <h3>
              Secure Bidding
            </h3>

            <p>
              Fair and transparent
              auction process.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              ✓
            </div>

            <h3>
              Verified Sellers
            </h3>

            <p>
              Trusted sellers with
              genuine products.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              ✓
            </div>

            <h3>
              Live Auctions
            </h3>

            <p>
              Real-time bidding
              experience.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">
              ✓
            </div>

            <h3>
              Premium Marketplace
            </h3>

            <p>
              Buy and sell valuable
              items with confidence.
            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Home;