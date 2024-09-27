import axios from "axios";

export const setAxiosBaseUrl = (baseUrl) => {
    axios.defaults.baseURL = baseUrl;
  };