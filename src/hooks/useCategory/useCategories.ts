import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "@/Services/categoryService";
import type { ICategory } from "@/types/ICategory";

export const useCategories = (filters?: Partial<ICategory>) => {
  const query = useQuery({
    queryKey: ["categories", filters],
    queryFn: () => CategoryService.getAll({ ...filters }),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    categories: query.data ?? [],
  };
};
