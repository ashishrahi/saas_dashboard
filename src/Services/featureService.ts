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
  // Fetch all features with pagination & optional filters
  getAll: async (params?: {
    page?: number;
    limit?: number;
    name?: string;
    title?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<FeaturesApiResponse> => {
    const response = await axiosInstance.get<FeaturesApiResponse>("/v1/features", { params });
    return response.data;
  },

  // Fetch a single feature by ID
  getById: async (id: string): Promise<IFeature> => {
    const response = await axiosInstance.get<{ data: IFeature }>(`/v1/features/${id}`);
    return response.data.data;
  },

  // Create a new feature
  create: async (feature: Omit<IFeature, "_id">): Promise<IFeature> => {
    const response = await axiosInstance.post<{ data: IFeature }>("/v1/features", feature);
    return response.data.data;
  },

  // Update an existing feature
  update: async (feature: IFeature): Promise<IFeature> => {
    const response = await axiosInstance.put<{ data: IFeature }>(
      `/v1/features/${feature._id}`,
      feature
    );
    return response.data.data;
  },

  // Delete a feature by ID
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/v1/features/${id}`);
  },
};
