import axios from "axios";
import queryString from "query-string";
import { deleteCookie, getCookie } from "src/helpers/cookie";

const apiConfig = {
  baseURL: "https://ec01-03-server.herokuapp.com/",
  // baseURL: "http://localhost:3001/",
  token: localStorage.getItem("token") || "",
};

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
    // token: apiConfig.token,
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token") || getCookie("token");
  if (token) {
    config.headers.token = token;
  }

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      deleteCookie("token");
    }
  }
);

export { axiosClient };
