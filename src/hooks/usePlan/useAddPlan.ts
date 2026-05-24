import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanService } from "@/Services/planService";
import type { IPlan } from "@/types/IPlan";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";

export const useAddPlan = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<IPlan>,
    unknown,
    Omit<IPlan, "_id">
  >({
    mutationFn: (newPlan) => PlanService.create(newPlan),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};