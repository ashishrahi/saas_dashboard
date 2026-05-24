import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/Services/categoryService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";
import type { ICategory } from "@/types/ICategory";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ICategory>,
    unknown,
    string 
  >({
    mutationFn: (_id: string) => CategoryService.delete(_id),

    onSuccess: (res, _id) => {
      queryClient.setQueriesData<ICategory[]>(
        { queryKey: ["categories"] },
        (old) => (old ? old.filter((item) => item._id !== _id) : old)
      );

      showSuccessToast(res.message);
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};