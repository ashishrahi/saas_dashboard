import axiosInstance from "../Services/apiClient";
import type { IPlan } from "@/types/IPlan";
import type { ApiResponse } from "@/types/ApiResponse";

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

// Paginated Response
export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: Pagination;
}

export const PlanService = {
  // Get All (pagination)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    name?: string;
    period?: string;
    isActive?: boolean;
    popular?: boolean;
    startDate?: string;
    endDate?: string;
  }): Promise<PaginatedResponse<IPlan[]>> => {
    const response = await axiosInstance.get<PaginatedResponse<IPlan[]>>(
      "/v1/plans",
      { params }
    );
    return response.data;
  },

  // Get By Id
  getById: async (id: string): Promise<ApiResponse<IPlan>> => {
    const response = await axiosInstance.get<ApiResponse<IPlan>>(
      `/v1/plans/${id}`
    );
    return response.data;
  },

  // Create
  create: async (
    plan: Omit<IPlan, "_id">
  ): Promise<ApiResponse<IPlan>> => {
    const response = await axiosInstance.post<ApiResponse<IPlan>>(
      "/v1/plans",
      plan
    );
    return response.data;
  },

  // Update
  update: async (plan: IPlan): Promise<ApiResponse<IPlan>> => {
    const response = await axiosInstance.put<ApiResponse<IPlan>>(
      `/v1/plans/${plan._id}`,
      plan
    );
    return response.data;
  },

  // Delete
  delete: async (id: string): Promise<ApiResponse<IPlan>> => {
    const response = await axiosInstance.delete<ApiResponse<IPlan>>(
      `/v1/plans/${id}`
    );
    return response.data;
  },
};