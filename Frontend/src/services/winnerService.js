import api from "./api";

export const getWinner = async (auctionId) => {
  const response = await api.get(
    `/bids/winner/${auctionId}`
  );

  return response.data;
};