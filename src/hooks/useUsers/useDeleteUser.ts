import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/Services/userService";
import { showErrorToast } from "@/utilities/showErrorToast";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await UserService.delete(id); 
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (error) => {
      showErrorToast(error, "Failed to delete user");
    },
  });
};