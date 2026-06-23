import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuction } from "../services/auctionService";
import "../styles/auction.css";

function CreateAuction() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    startTime: "",
    endTime: "",
    imageUrl: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setFormData((prev) => ({
        ...prev,
        imageUrl: reader.result
      }));

    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem("loggedInUser")
      );

      await createAuction({
        ...formData,
        sellerId: user.id
      });

      navigate("/auctions");

    } catch (error) {

      console.error(error);

      alert("Failed To Create Auction");

    }
  };

  return (
    <div className="create-auction-container">

      <h1>Create Auction</h1>

      <form
        className="create-auction-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Auction Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="startingPrice"
          placeholder="Starting Price"
          value={formData.startingPrice}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {formData.imageUrl && (

          <img
            src={formData.imageUrl}
            alt="Preview"
            style={{
              width: "250px",
              borderRadius: "12px",
              marginTop: "10px",
              objectFit: "cover"
            }}
          />

        )}

        <button type="submit">
          Create Auction
        </button>

      </form>

    </div>
  );
}

export default CreateAuction;