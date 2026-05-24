import { useQuery } from "@tanstack/react-query";
import { FeatureService } from "@/Services/featureService";
import type { IFeature } from "@/types/IFeatures";

type FeatureFilters = {
  title?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
};

type FeatureQueryResult = {
  items: IFeature[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export const useFeatures = (
  page: number,
  limit: number,
  filters?: FeatureFilters
) => {
  return useQuery({
    queryKey: ["features", page, limit, filters],
    queryFn: () => FeatureService.getAll({ page, limit, ...filters }),

    select: (res): FeatureQueryResult => ({
      items: res.data,
      pagination: res.pagination,
    }),

    staleTime: 1000 * 60 * 5,
  });
};