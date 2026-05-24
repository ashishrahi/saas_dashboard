import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubCategoryService } from "@/Services/subCategoryService";
import type { ISubCategory } from "@/types/ISubCategory";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ISubCategory>,
    unknown,
    ISubCategory
  >({
    mutationFn: (subCategory) =>
      SubCategoryService.update(subCategory),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });

      showSuccessToast(res.message);
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};