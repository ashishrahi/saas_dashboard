import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanService } from "@/Services/planService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";
import type { IPlan } from "@/types/IPlan";

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<IPlan>,
    unknown,
    string 
  >({
    mutationFn: (_id: string) => PlanService.delete(_id),

    onSuccess: (res, _id) => {
      queryClient.setQueriesData<IPlan[]>(
        { queryKey: ["plans"] },
        (old) => (old ? old.filter((item) => item._id !== _id) : old)
      );

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};