import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import type { IFeature } from "@/types/IFeatures";

export const useUpdateFeature = () => {
  const queryClient = useQueryClient();

  return useMutation<IFeature, Error, IFeature>({
    mutationFn: (updatedFeature: IFeature) => FeatureService.update(updatedFeature),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });
};
