import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/userService";
import { IUser } from "@/types/userTypes";

export const useUser = (id: string) => {
  return useQuery<IUser, Error>({
    queryKey: ["user", id], 
    queryFn: () => UserService.getById(id),
    staleTime: 1000 * 60 * 5, 
  });
};