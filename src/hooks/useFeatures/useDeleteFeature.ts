import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { IFeature } from "@/types/IFeatures";
import type { ApiResponse } from "@/types/ApiResponse";

export const useDeleteFeature = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<IFeature>, Error, string>({
    mutationFn: (id: string) => FeatureService.delete(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      showSuccessToast(res.message); 
    },
     onError: (err) => {
        showErrorToast(err);
      },
  });
};
