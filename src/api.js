import axios from "axios";

// Configure axios instance for API calls with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api",
});

// Add authorization token to all requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API functions
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);

// Event management API functions
export const getEvents = () => api.get("/events");
export const addEvent = (data) => api.post("/events", data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const toggleStatus = (id) => api.patch(`/events/${id}/status`);

// Swap functionality API functions
export const getSwappableSlots = () => api.get("/swaps/swappable-slots");
export const createSwapRequest = (data) => api.post("/swaps/request", data);
export const respondToSwapRequest = (id, status) => api.post(`/swaps/response/${id}`, { status });
export const getSwapRequests = () => api.get("/swaps/requests");
export const getSwapHistory = () => api.get("/swaps/history");

export default api;
