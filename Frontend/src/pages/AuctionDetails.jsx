import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAuctionById } from "../services/auctionService";
import { placeBid, getAuctionBids } from "../services/bidService";
import "../styles/auctionDetails.css";

function AuctionDetails() {

  const { id } = useParams();

  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {

    fetchAuction();
    fetchBids();

  }, []);

  const fetchAuction = async () => {

    try {

      const data =
        await getAuctionById(id);

      setAuction(data);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchBids = async () => {

    try {

      const data =
        await getAuctionBids(id);

      const sortedBids =
        data.sort(
          (a, b) =>
            b.bidAmount -
            a.bidAmount
        );

      setBids(sortedBids);

    } catch (error) {

      console.error(error);

    }
  };

  const handleBid = async (e) => {

    e.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem(
          "loggedInUser"
        )
      );

      await placeBid({

        auctionId:
          Number(id),

        userId:
          user.id,

        bidAmount:
          Number(bidAmount)

      });

      setBidAmount("");

      fetchAuction();
      fetchBids();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Place Bid"
      );
    }
  };

  if (!auction) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="auction-details-container">

      <div className="auction-header-card">

        <img
          src={
            auction.imageUrl
              ? auction.imageUrl
              : "https://via.placeholder.com/1200x500"
          }
          alt={auction.title}
          className="auction-details-image"
        />

        <div className="auction-content">

          <h1>
            {auction.title}
          </h1>

          <p>
            {auction.description}
          </p>

          <div className="auction-stats">

            <div className="info-card">

              <h3>
                Current Price
              </h3>

              <span>
                ₹{auction.currentPrice}
              </span>

            </div>

            <div className="info-card">

              <h3>
                Status
              </h3>

              <span
                className={
                  auction.status ===
                  "ACTIVE"
                    ? "active-status"
                    : "closed-status"
                }
              >
                {auction.status}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="bid-section">

        <h2>
          Place Your Bid
        </h2>

        {auction.status === "ACTIVE" ? (

          <form
            className="bid-form"
            onSubmit={handleBid}
          >

            <input
              type="number"
              placeholder="Enter Bid Amount"
              value={bidAmount}
              onChange={(e) =>
                setBidAmount(
                  e.target.value
                )
              }
            />

            <button type="submit">
              Place Bid
            </button>

          </form>

        ) : (

          <div className="auction-closed-message">
            Auction Closed
          </div>

        )}

        <div
          style={{
            marginTop: "20px"
          }}
        >

          <Link
            to={`/winner/${auction.id}`}
            style={{
              background:
                "#2563eb",
              color:
                "white",
              padding:
                "12px 20px",
              borderRadius:
                "10px",
              textDecoration:
                "none",
              fontWeight:
                "bold"
            }}
          >
            View Winner
          </Link>

        </div>

      </div>

      <div className="bid-history-section">

        <h2>
          Bid History
        </h2>

        {bids.length === 0 ? (

          <p>
            No bids placed yet.
          </p>

        ) : (

          bids.map((bid) => (

            <div
              className="bid-history-card"
              key={bid.id}
            >

              <strong>
                {bid.bidder.name}
              </strong>

              <span>
                ₹{bid.bidAmount}
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default AuctionDetails;