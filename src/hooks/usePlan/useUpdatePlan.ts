import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlanService } from "@/Services/planService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { IPlan } from "@/types/IPlan";
import type { ApiResponse } from "@/types/ApiResponse";

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<IPlan>, Error, IPlan>({
    mutationFn: PlanService.update,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      showSuccessToast(res.message);
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};