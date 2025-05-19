import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000, // 5 second timeout
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error(
        "Network Error - Please check if the backend server is running"
      );
      throw new Error(
        "Unable to connect to the server. Please check if the server is running."
      );
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(userData) {
    const response = await api.post("/user/register", userData);
    if (response.data.token) {
      const userData = {
        ...response.data.user,
        token: response.data.token,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return response.data;
  },

  async login(email, password) {
    const response = await api.post("/user/login", { email, password });
    if (response.data.token) {
      const userData = {
        ...response.data.user,
        token: response.data.token,
      };
      localStorage.setItem("user", JSON.stringify(userData));
    }
    return response.data;
  },

  async getProfile() {
    return await api.get("/user/profile");
  },

  logout() {
    localStorage.removeItem("user");
  },
};
