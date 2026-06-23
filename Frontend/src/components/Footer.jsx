import "../styles/footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <h2>R&S Auctions</h2>

          <span className="footer-tagline">
            Bid • Win • Own
          </span>

          <p>
            A modern online auction platform
            connecting buyers and sellers
            through secure bidding.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="/auctions">Auctions</a>

          <a href="/dashboard">Dashboard</a>

        </div>

        <div className="footer-links">

          <h3>Features</h3>

          <p>Live Auctions</p>

          <p>Secure Bidding</p>

          <p>Seller Dashboard</p>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 R&S Auctions.
        All Rights Reserved.

      </div>

    </footer>

  );
}

export default Footer;