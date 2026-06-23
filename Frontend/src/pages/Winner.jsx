import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getWinner } from "../services/bidService";
import "../styles/winner.css";

function Winner() {

  const { id } = useParams();

  const [winner, setWinner] = useState(null);

  useEffect(() => {

    fetchWinner();

  }, []);

  const fetchWinner = async () => {

    try {

      const data = await getWinner(id);

      setWinner(data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!winner) {

    return (
      <div className="winner-loading">
        Loading Winner...
      </div>
    );

  }

  return (

    <div className="winner-container">

      <div className="winner-card">

        <div className="trophy">
          🏆
        </div>

        <h1>
          Auction Winner
        </h1>

        <div className="winner-info">

          <div className="winner-row">

            <span>
              Auction
            </span>

            <strong>
              {winner.auctionTitle}
            </strong>

          </div>

          <div className="winner-row">

            <span>
              Winner
            </span>

            <strong>
              {winner.winnerName}
            </strong>

          </div>

          <div className="winner-row">

            <span>
              Winning Bid
            </span>

            <strong>
              ₹{winner.winningBid}
            </strong>

          </div>

        </div>

        <p className="winner-message">
          Congratulations to the highest bidder!
        </p>

        <Link
          to="/auctions"
          className="winner-btn"
        >
          Back To Auctions
        </Link>

      </div>

    </div>

  );
}

export default Winner;