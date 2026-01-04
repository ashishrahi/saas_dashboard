import { useQuery } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import type{ IFeature } from "@/types/IFeatures";

export const useFeature = (id: string) => {
  return useQuery<IFeature, Error>({
    queryKey: ["feature", id], 
    queryFn: () => FeatureService.getById(id),
    staleTime: 1000 * 60 * 5, 
  });
};
