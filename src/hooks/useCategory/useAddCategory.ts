import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/Services/categoryService";
import type { ICategory } from "@/types/ICategory";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";

export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ICategory>,
    unknown,
    Omit<ICategory, "_id">
  >({
    mutationFn: (newCategory) =>
      CategoryService.create(newCategory),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};