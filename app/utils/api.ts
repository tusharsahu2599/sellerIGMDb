import axios, { AxiosInstance } from "axios";

// Avoid creating network clients at module evaluation time so prerender
// doesn't try to open connections or access env in unexpected ways.
// Export a factory that callers (client components / effects) call at runtime.
export function createApi(): AxiosInstance {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const api = axios.create({
    baseURL,
    timeout: 30000,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Keep the logging but avoid throwing during module eval
      console.error("API Error:", error?.response?.data || error?.message);
      return Promise.reject(error);
    }
  );

  return api;
}

// Default export kept for compatibility but it's the factory itself.
export default createApi;
