import { useQuery } from "@tanstack/react-query";
import { SubCategoryService } from "@/Services/subCategoryService";

export const useSubCategories = () => {
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: () => SubCategoryService.getAll(),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });
};
