import { useEffect, useState } from "react";
import {
  getAllAuctions,
  getSellerAuctions,
  deleteAuction
} from "../services/auctionService";

import {
  getAllUsers,
  deleteUser
} from "../services/authService";

import "../styles/dashboard.css";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const [auctions, setAuctions] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchAuctions();

    if (
      user.role === "SELLER" ||
      user.role === "BOTH"
    ) {
      fetchMyAuctions();
    }

    if (user.role === "ADMIN") {
      fetchUsers();
    }

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

  const fetchMyAuctions = async () => {

    try {

      const data =
        await getSellerAuctions(
          user.id
        );

      setMyAuctions(data);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchUsers = async () => {

    try {

      const data =
        await getAllUsers();

      setUsers(data);

    } catch (error) {

      console.error(error);

    }
  };

  const handleDeleteUser =
    async (id) => {

      try {

        await deleteUser(id);

        fetchUsers();

      } catch (error) {

        console.error(error);

      }
    };

  const handleDeleteAuction =
    async (id) => {

      try {

        await deleteAuction(id);

        fetchAuctions();

        if (
          user.role === "SELLER" ||
          user.role === "BOTH"
        ) {
          fetchMyAuctions();
        }

      } catch (error) {

        console.error(error);

      }
    };

  const totalAuctions =
    auctions.length;

  const activeAuctions =
    auctions.filter(
      auction =>
        auction.status === "ACTIVE"
    ).length;

  const closedAuctions =
    auctions.filter(
      auction =>
        auction.status === "CLOSED"
    ).length;

  const highestPrice =
    auctions.length > 0
      ? Math.max(
          ...auctions.map(
            auction =>
              auction.currentPrice
          )
        )
      : 0;

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <h1>
          Welcome, {user.name}
        </h1>

        <p>
          Role: {user.role}
        </p>

      </div>

      <div className="stats-grid">

        <div className="dashboard-card">

          <h2>
            {totalAuctions}
          </h2>

          <p>
            Total Auctions
          </p>

        </div>

        <div className="dashboard-card">

          <h2>
            {activeAuctions}
          </h2>

          <p>
            Active Auctions
          </p>

        </div>

        <div className="dashboard-card">

          <h2>
            {closedAuctions}
          </h2>

          <p>
            Closed Auctions
          </p>

        </div>

        <div className="dashboard-card">

          <h2>
            ₹{highestPrice}
          </h2>

          <p>
            Highest Bid
          </p>

        </div>

      </div>

      {(user.role === "SELLER" ||
        user.role === "BOTH") && (

        <div className="recent-auctions-section">

          <h2>
            My Auctions
          </h2>

          <div className="recent-auctions-grid">

            {myAuctions.map(
              (auction) => (

                <div
                  className="recent-auction-card"
                  key={auction.id}
                >

                  <img
                    src={
                      auction.imageUrl
                    }
                    alt={
                      auction.title
                    }
                    style={{
                      width:
                        "100%",
                      height:
                        "180px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "12px",
                      marginBottom:
                        "15px"
                    }}
                  />

                  <h3>
                    {auction.title}
                  </h3>

                  <p>
                    {
                      auction.description
                    }
                  </p>

                  <div
                    className="auction-info"
                  >

                    <span>
                      ₹
                      {
                        auction.currentPrice
                      }
                    </span>

                    <span
                      className={
                        auction.status ===
                        "ACTIVE"
                          ? "status-active"
                          : "status-closed"
                      }
                    >
                      {
                        auction.status
                      }
                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {user.role === "ADMIN" && (

        <>

          <div className="recent-auctions-section">

            <h2>
              User Management
            </h2>

            <div className="recent-auctions-grid">

              {users.map((u) => (

                <div
                  className="recent-auction-card"
                  key={u.id}
                >

                  <h3>
                    {u.name}
                  </h3>

                  <p>
                    {u.email}
                  </p>

                  <p>
                    Role:
                    {" "}
                    {u.role}
                  </p>

                  {u.role !==
                    "ADMIN" && (

                    <button
                      onClick={() =>
                        handleDeleteUser(
                          u.id
                        )
                      }
                    >
                      Delete User
                    </button>

                  )}

                </div>

              ))}

            </div>

          </div>

          <div className="recent-auctions-section">

            <h2>
              Auction Management
            </h2>

            <div className="recent-auctions-grid">

              {auctions.map(
                (auction) => (

                  <div
                    className="recent-auction-card"
                    key={auction.id}
                  >

                    <img
                      src={
                        auction.imageUrl
                      }
                      alt={
                        auction.title
                      }
                      style={{
                        width:
                          "100%",
                        height:
                          "180px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "12px",
                        marginBottom:
                          "15px"
                      }}
                    />

                    <h3>
                      {
                        auction.title
                      }
                    </h3>

                    <p>
                      ₹
                      {
                        auction.currentPrice
                      }
                    </p>

                    <button
                      onClick={() =>
                        handleDeleteAuction(
                          auction.id
                        )
                      }
                    >
                      Delete Auction
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        </>

      )}

    </div>

  );
}

export default Dashboard;