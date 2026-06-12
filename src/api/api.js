import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";

    const isAuthRequest =
      requestUrl.includes("/auth/signin") ||
      requestUrl.includes("/auth/signup");

    if (status === 401 && !isAuthRequest) {
      localStorage.removeItem("auth");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("pendingCheckoutOrder");
      localStorage.removeItem("CHECKOUT_ADDRESS");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
