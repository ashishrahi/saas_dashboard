import { useQuery } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import type { IFeature } from "@/types/IFeatures";
import type { ApiResponse } from "@/types/ApiResponse";

export const useFeature = (id: string) => {
  return useQuery<ApiResponse<IFeature>, Error, IFeature>({
    queryKey: ["feature", id],

    queryFn: () => FeatureService.getById(id),

    select: (response) => response.data, // ✅ fix

    staleTime: 1000 * 60 * 5,
    enabled: !!id, // optional but recommended
  });
};