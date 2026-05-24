import axiosInstance from "../Services/apiClient";
import type { ISubCategory } from "@/types/ISubCategory";
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

export const SubCategoryService = {
  // Get All (pagination)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    name?: string;
    categoryId?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<ISubCategory[]>> => {
    const response = await axiosInstance.get<
      PaginatedResponse<ISubCategory[]>
    >("/v1/subcategories", { params });

    return response.data;
  },

  // Get By Id
  getById: async (id: string): Promise<ApiResponse<ISubCategory>> => {
    const response = await axiosInstance.get<ApiResponse<ISubCategory>>(
      `/v1/subcategories/${id}`
    );

    return response.data;
  },

  // Create
  create: async (
    subCategory: Omit<ISubCategory, "_id">
  ): Promise<ApiResponse<ISubCategory>> => {
    const response = await axiosInstance.post<ApiResponse<ISubCategory>>(
      "/v1/subcategories",
      subCategory
    );

    return response.data;
  },

  // Update
  update: async (
    subCategory: ISubCategory
  ): Promise<ApiResponse<ISubCategory>> => {
    const response = await axiosInstance.put<ApiResponse<ISubCategory>>(
      `/v1/subcategories/${subCategory._id}`,
      subCategory
    );

    return response.data;
  },

  // Delete
  delete: async (id: string): Promise<ApiResponse<ISubCategory>> => {
    const response = await axiosInstance.delete<ApiResponse<ISubCategory>>(
      `/v1/subcategories/${id}`
    );

    return response.data;
  },
};