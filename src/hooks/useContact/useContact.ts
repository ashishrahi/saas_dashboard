import { useQuery } from "@tanstack/react-query";
import { ContactService } from "@/Services/contactService";
import type { IContact } from "@/types/IContact";
import type { ApiResponse } from "@/types/ApiResponse";

export const useContact = (id: string) => {
  return useQuery<ApiResponse<IContact>, Error, IContact>({
    queryKey: ["contact", id],

    queryFn: () => ContactService.getById(id),

    select: (response) => response.data, // ✅ now valid

    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};