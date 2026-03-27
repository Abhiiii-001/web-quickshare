import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axiosRetry from "axios-retry";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const REQUEST_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Configure retry logic
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    // Retry on network errors or 5xx server errors
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response?.status ? error.response.status >= 500 : false)
    );
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if exists
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("📤 Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("📥 Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error: AxiosError) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      console.error("❌ Response Error:", {
        status: error.response.status,
        message: error.response.data,
        url: error.config?.url,
      });

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      // Handle 403 Forbidden
      if (error.response.status === 403) {
        console.error("Access denied");
      }

      // Handle 429 Too Many Requests
      if (error.response.status === 429) {
        console.error("Rate limit exceeded");
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("❌ Network Error:", error.message);
    } else {
      // Error in request setup
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
