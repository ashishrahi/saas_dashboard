import axiosInstance from "../Services/apiClient";
import type { IUser } from "@/types/IUser";
import type { ApiResponse } from "@/types/ApiResponse";
import type { CreateUserPayload, UpdateUserPayload } from "@/types/UserPayload";

export const UserService = {
  // helper add (common header)
  getAuthConfig: () => {
    const token = localStorage.getItem("token");

    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {}; // FIX (empty string nahi bhejna)
  },

  //  Get All
  getAll: async (): Promise<ApiResponse<IUser[]>> => {
    const response = await axiosInstance.get<ApiResponse<IUser[]>>(
      "/v1/users",
      UserService.getAuthConfig()
    );
    return response.data;
  },

  // Get By Id
  getById: async (id: string): Promise<ApiResponse<IUser>> => {
    const response = await axiosInstance.get<ApiResponse<IUser>>(
      `/v1/users/${id}`,
      UserService.getAuthConfig()
    );
    return response.data;
  },

  // Create
  create: async (
    payload: CreateUserPayload | FormData
  ): Promise<ApiResponse<IUser>> => {
    const response = await axiosInstance.post<ApiResponse<IUser>>(
      "/v1/users",
      payload,
      UserService.getAuthConfig()
    );
    return response.data;
  },

  // Update
  update: async (
    payload: UpdateUserPayload | FormData
  ): Promise<ApiResponse<IUser>> => {
    const id =
      payload instanceof FormData
        ? (payload.get("_id") as string) // FIX (type cast)
        : payload._id;

    if (!id) {
      throw new Error("User ID is required"); // safety
    }

    const response = await axiosInstance.put<ApiResponse<IUser>>(
      `/v1/users/${id}`,
      payload,
      UserService.getAuthConfig()
    );
    return response.data;
  },

  // Delete
  delete: async (id: string): Promise<ApiResponse<IUser>> => {
    if (!id) {
      throw new Error("User ID is required"); // safety
    }

    const response = await axiosInstance.delete<ApiResponse<IUser>>(
      `/v1/users/${id}`,
      UserService.getAuthConfig()
    );
    return response.data;
  },
};