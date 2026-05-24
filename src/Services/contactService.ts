import axiosInstance from "../Services/apiClient";
import type { IContact } from "@/types/IContact";
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

export const ContactService = {
  // Get All (pagination)
  getAll: async (params?: {
    page?: number;
    limit?: number;
    name?: string;
    email?: string;
    isRead?: boolean;
  }): Promise<PaginatedResponse<IContact[]>> => {
    const response = await axiosInstance.get<PaginatedResponse<IContact[]>>(
      "/v1/contacts",
      { params }
    );
    return response.data;
  },

  // Get By Id
  getById: async (id: string): Promise<ApiResponse<IContact>> => {
    const response = await axiosInstance.get<ApiResponse<IContact>>(
      `/v1/contacts/${id}`
    );
    return response.data;
  },

  // Create
  create: async (
    contact: Omit<IContact, "_id" | "isRead" | "createdAt">
  ): Promise<ApiResponse<IContact>> => {
    const response = await axiosInstance.post<ApiResponse<IContact>>(
      "/v1/contacts",
      contact
    );
    return response.data;
  },

  // Update
  update: async (contact: {
    _id: string;
    isRead?: boolean;
  }): Promise<ApiResponse<IContact>> => {
    const response = await axiosInstance.put<ApiResponse<IContact>>(
      `/v1/contacts/${contact._id}`,
      contact
    );
    return response.data;
  },

  //  Delete
  delete: async (id: string): Promise<ApiResponse<IContact>> => {
    const response = await axiosInstance.delete<ApiResponse<IContact>>(
      `/v1/contacts/${id}`
    );
    return response.data;
  },
};