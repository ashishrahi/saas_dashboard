import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubCategoryService } from "@/Services/subCategoryService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";
import type { ISubCategory } from "@/types/ISubCategory";

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ISubCategory>,
    unknown,
    string // 👈 this is _id
  >({
    mutationFn: (_id: string) => SubCategoryService.delete(_id),

    onSuccess: (res, _id) => {
      queryClient.setQueriesData<ISubCategory[]>(
        { queryKey: ["subcategories"] },
        (old) => (old ? old.filter((item) => item._id !== _id) : old)
      );

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};