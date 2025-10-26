import axios from "axios";

const BASE_URL = "https://qtify-backend.labs.crio.do";

export const getTopAlbums = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/albums/top`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top albums:", error);
    return [];
  }
};

export const getNewAlbums = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/albums/new`);
    return response.data;
  } catch (error) {
    console.error("Error fetching new albums:", error);
    return [];
  }
};

export const getSongs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/songs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};
