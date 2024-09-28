import axios from "axios";

const API_FIRST = (ip) => {
  return axios.create({
    baseURL: `http://${ip}:5000`,
  });
};

export const getFromPiAPi = async (ip, endpoint) => {
  try {
    const response = await API_FIRST(ip).get(endpoint);
    return response.data;
  } catch (error) {
    if (error?.code === "ERR_NETWORK") {
      throw Object.assign(new Error("ERR_NETWORK"), { code: 503 });
    } else {
      throw error.response.data;
    }
  }
};

export const postToPiAPi = async (ip, endpoint, data) => {
  try {
    const response = await API_FIRST(ip).post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const putToPiAPi = async (ip, endpoint, data) => {
  try {
    const response = await API_FIRST(ip).put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteFromPiAPi = async (ip, endpoint) => {
  try {
    const response = await API_FIRST(ip).delete(endpoint);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
