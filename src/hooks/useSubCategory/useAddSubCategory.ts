import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubCategoryService } from "@/Services/subCategoryService";
import type { ISubCategory } from "@/types/ISubCategory";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";

export const useAddSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ISubCategory>,
    unknown,
    Omit<ISubCategory, "_id">
  >({
    mutationFn: (newSubCategory) =>
      SubCategoryService.create(newSubCategory),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};