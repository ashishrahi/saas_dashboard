import { useQuery } from "@tanstack/react-query";
import { PlanService } from "@/Services/planService";
import type { IPlan } from "@/types/IPlan";

/** List filters: server may accept date range in addition to IPlan fields */
export type PlanListFilters = Partial<IPlan> & {
  startDate?: string;
  endDate?: string;
};

export const usePlans = (filters?: PlanListFilters) => {
  return useQuery({
    queryKey: ["plans", filters],
    queryFn: () => PlanService.getAll({ ...filters }),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });
};
