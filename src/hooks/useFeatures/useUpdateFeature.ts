import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { IFeature } from "@/types/IFeatures";
import type { ApiResponse } from "@/types/ApiResponse";

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<IFeature>, Error, IFeature>({
    mutationFn: FeatureService.update,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      showSuccessToast(res.message);
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};