import api from "./api";

export const placeBid = async (bidData) => {
  const response = await api.post("/bids", bidData);
  return response.data;
};

export const getAuctionBids = async (auctionId) => {
  const response = await api.get(`/bids/${auctionId}`);
  return response.data;
};

export const getWinner = async (auctionId) => {
  const response = await api.get(`/bids/winner/${auctionId}`);
  return response.data;
};