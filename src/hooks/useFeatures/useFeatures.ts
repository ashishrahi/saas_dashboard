import { useQuery } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import type { IFeature } from "@/types/IFeatures";

interface FeaturesApiResponse {
  data: IFeature[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export const useFeatures = (
  page: number,
  limit: number,
  filters?: Partial<IFeature>
) => {
  return useQuery<FeaturesApiResponse, Error>({
    queryKey: ["features", page, limit, filters],
    queryFn: () => FeatureService.getAll({ page, limit, ...filters }),
    staleTime: 1000 * 60 * 5,
  });
};
