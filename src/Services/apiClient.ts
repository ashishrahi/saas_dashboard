
import axios from "axios";

const AUTH_SIGNIN_PATH = "/signin";
const AUTH_ENDPOINTS = [
  "/v1/admin/login",
  "/v1/admin/register",
  "/v1/admin/refresh-token",
  "/v1/admin/logout",
];

let isRefreshing = false;
let isRedirecting = false;

function isAuthEndpoint(url?: string) {
  if (!url) return false;
  return AUTH_ENDPOINTS.some((path) => url.includes(path));
}

function clearAuthStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tenantId");
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
}

function redirectToSignIn() {
  if (typeof window === "undefined" || isRedirecting) return;
  isRedirecting = true;
  clearAuthStorage();
  window.location.href = AUTH_SIGNIN_PATH;
}

function normalizeError(error: unknown) {
  const axiosError = error as {
    response?: { data?: { message?: string; errors?: Record<string, string> | null }; status?: number };
  };
  const data = axiosError?.response?.data;

  return {
    message: data?.message || "Something went wrong",
    errors: data?.errors || null,
    status: axiosError?.response?.status,
  };
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api"
  // baseURL: "https://api.ashishrahidev.site/api"
  ,

  headers: { "Content-Type": "application/json" },
});

// ===== Request interceptor: add token =====
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ===== Response interceptor: refresh token on 401 =====
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
      _skipAuthRefresh?: boolean;
    };

    const status = error.response?.status;

  // ===== HANDLE 401 (refresh token) =====
    if (status === 401) {
      const skipRefresh =
        originalRequest?._skipAuthRefresh ||
        isAuthEndpoint(originalRequest?.url);

      if (skipRefresh) {
        return Promise.reject(normalizeError(error));
      }

      if (originalRequest._retry || isRefreshing) {
        redirectToSignIn();
        return Promise.reject(normalizeError(error));
      }

      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          isRefreshing = true;
          try {
            const { data } = await axiosInstance.post(
              "/v1/admin/refresh-token",
              { refreshToken },
              { _skipAuthRefresh: true } as Parameters<typeof axiosInstance.post>[2]
            );

            const newToken = data?.data?.token;

            if (!newToken || typeof newToken !== "string") {
              redirectToSignIn();
              return Promise.reject(normalizeError(error));
            }

            localStorage.setItem("token", newToken);
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            redirectToSignIn();
            return Promise.reject(normalizeError(refreshError));
          } finally {
            isRefreshing = false;
          }
        }

        redirectToSignIn();
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

export default axiosInstance;
