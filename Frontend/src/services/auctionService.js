import api from "./api";

export const getAllAuctions = async () => {

  const response = await api.get(
    "/auctions"
  );

  return response.data;
};

export const createAuction = async (
  auctionData
) => {

  const response = await api.post(
    "/auctions",
    auctionData
  );

  return response.data;
};

export const getAuctionById = async (
  id
) => {

  const response = await api.get(
    `/auctions/${id}`
  );

  return response.data;
};

export const getSellerAuctions = async (
  sellerId
) => {

  const response = await api.get(
    `/auctions/seller/${sellerId}`
  );

  return response.data;
};

export const deleteAuction = async (
  auctionId
) => {

  const response = await api.delete(
    `/auctions/admin/${auctionId}`
  );

  return response.data;
};