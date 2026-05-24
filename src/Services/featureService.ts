import type { ApiResponse } from "@/types/ApiResponse";
import axiosInstance from "../Services/apiClient";
import type { IFeature } from "@/types/IFeatures";

// Pagination type
export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

// API response type for getAll
export interface FeaturesApiResponse {
  data: IFeature[];
  pagination: Pagination;
}

export const FeatureService = {
  // Fetch all features
  getAll: async (params?: {
    page?: number;
    limit?: number;
    name?: string;
    title?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<FeaturesApiResponse> => {
    const response = await axiosInstance.get<FeaturesApiResponse>(
      "/v1/features",
      { params },
    );
    return response.data;
  },

  // Fetch single
  getById: async (id: string): Promise<ApiResponse<IFeature>> => {
    const response = await axiosInstance.get<ApiResponse<IFeature>>(
      `/v1/features/${id}`,
    );
    return response.data;
  },

  // Create
  create: async (
    feature: Omit<IFeature, "_id">,
  ): Promise<ApiResponse<IFeature>> => {
    const response = await axiosInstance.post<ApiResponse<IFeature>>(
      "/v1/features",
      feature,
    );
    return response.data;
  },

  // Update FIXED
  update: async (feature: IFeature): Promise<ApiResponse<IFeature>> => {
    const response = await axiosInstance.put<ApiResponse<IFeature>>(
      `/v1/features/${feature._id}`,
      feature,
    );
    return response.data;
  },

  // Delete FIXED
  delete: async (id: string): Promise<ApiResponse<IFeature>> => {
    const response = await axiosInstance.delete<ApiResponse<IFeature>>(
      `/v1/features/${id}`,
    );
    return response.data;
  },
};
