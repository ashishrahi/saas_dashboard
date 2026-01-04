import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/Services/userService";
import type { IUser } from "@/types/IUser";

export const useUser = (id: string) => {
  return useQuery<IUser, Error>({
    queryKey: ["user", id], 
    queryFn: () => UserService.getById(id),
    staleTime: 1000 * 60 * 5, 
  });
};