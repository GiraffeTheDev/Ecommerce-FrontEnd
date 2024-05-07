import { instance } from "../config/axios";

const fetchProtectedData = async (accessToken) => {
  try {
    const response = await instance.get(
      "http://localhost:8002/v1/protected-route",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Gọi API cho /api/refresh-token
const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await instance.post(
      "http://localhost:8002/v1/refresh-token",
      { refreshToken }
    );
    const newAccessToken = response.data.access_token;
    return newAccessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export { fetchProtectedData, refreshAccessToken };
