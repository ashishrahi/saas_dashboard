import { useQuery } from "@tanstack/react-query";
import { PlanService } from "@/Services/planService";
import type { IPlan } from "@/types/IPlan";
import type { ApiResponse } from "@/types/ApiResponse";

export const usePlan = (id: string) => {
  return useQuery<ApiResponse<IPlan>, Error, IPlan>({
    queryKey: ["plan", id],

    queryFn: () => PlanService.getById(id),

    select: (response) => response.data, // ✅ fix

    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};