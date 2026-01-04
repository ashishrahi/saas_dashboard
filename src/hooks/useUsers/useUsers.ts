import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/Services/userService";
import type { IUser } from "@/types/IUser";

export const useUsers = () => {
  return useQuery<IUser[], Error>({
    queryKey: ["users"], 
    queryFn: UserService.getAll, 
    staleTime: 1000 * 60 * 5, 
  });
};