import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/Services/userService";
import type { IUser } from "@/types/IUser";
import type { ApiResponse } from "@/types/ApiResponse";

export const useUsers = () => {
  return useQuery<
    ApiResponse<IUser[]>, // API response
    Error,
    IUser[]               // final clean data
  >({
    queryKey: ["users"],
    queryFn: UserService.getAll,

    select: (res) => res.data,

    staleTime: 1000 * 60 * 5,
  });
};