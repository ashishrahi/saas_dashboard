import axiosInstance from "../Services/apiClient";
import type { ICategory } from "@/types/ICategory";
import type { ApiResponse } from "@/types/ApiResponse";

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

export const CategoryService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    name?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<ICategory[]>> => {
    const response = await axiosInstance.get<PaginatedResponse<ICategory[]>>(
      "/v1/categories",
      { params }
    );
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<ICategory>> => {
    const response = await axiosInstance.get<ApiResponse<ICategory>>(
      `/v1/categories/${id}`
    );
    return response.data;
  },

  create: async (
    category: Omit<ICategory, "_id">
  ): Promise<ApiResponse<ICategory>> => {
    const response = await axiosInstance.post<ApiResponse<ICategory>>(
      "/v1/categories",
      category
    );
    return response.data;
  },

  update: async (
    category: ICategory
  ): Promise<ApiResponse<ICategory>> => {
    const response = await axiosInstance.put<ApiResponse<ICategory>>(
      `/v1/categories/${category._id}`,
      category
    );
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<ICategory>> => {
    const response = await axiosInstance.delete<ApiResponse<ICategory>>(
      `/v1/categories/${id}`
    );
    return response.data;
  },
};