import api from "./api";

export const registerUser = async (
  userData
) => {

  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const loginUser = async (
  userData
) => {

  const response = await api.post(
    "/auth/login",
    userData
  );

  return response.data;
};

export const getAllUsers = async () => {

  const response = await api.get(
    "/auth/users"
  );

  return response.data;
};

export const deleteUser = async (
  userId
) => {

  const response = await api.delete(
    `/auth/users/${userId}`
  );

  return response.data;
};