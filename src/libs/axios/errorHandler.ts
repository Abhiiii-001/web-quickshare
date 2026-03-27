import { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
  errors?: string[];
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    if (error.response) {
      // Server responded with error
      return {
        message: error.response.data?.message || "An error occurred",
        status: error.response.status,
        errors: error.response.data?.errors || [],
      };
    } else if (error.request) {
      // Request made but no response
      return {
        message: "Network error. Please check your connection.",
      };
    }
  }

  // Generic error
  return {
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
  };
};
