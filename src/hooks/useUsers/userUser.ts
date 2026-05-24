import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/Services/userService";
import type { IUser } from "@/types/IUser";
import type { ApiResponse } from "@/types/ApiResponse";

export const useUser = (id: string) => {
  return useQuery<ApiResponse<IUser>, Error, IUser>({
    queryKey: ["user", id],

    queryFn: () => UserService.getById(id),

    select: (response) => response.data, // ✅ fix

    staleTime: 1000 * 60 * 5,
    enabled: !!id, // recommended
  });
};