import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import type{ IFeature } from "@/types/IFeatures";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";

export const useAddFeature = () => {
  const queryClient = useQueryClient();

 return useMutation<
  ApiResponse<IFeature>, 
  unknown,
  Omit<IFeature, "_id">
>({
  mutationFn: (newFeature) => FeatureService.create(newFeature),

  onSuccess: (res) => {
    queryClient.invalidateQueries({ queryKey: ["features"] });

    showSuccessToast(res.message); 
  },

  onError: (err) => {
    showErrorToast(err);
  },
});
};
