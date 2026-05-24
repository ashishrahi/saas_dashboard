import { useQuery } from "@tanstack/react-query";
import { ContactService } from "@/Services/contactService";
import type { IContact } from "@/types/IContact";

export const useContacts = (filters?: Partial<IContact>) => {
  return useQuery({
    queryKey: ["contacts", filters],
    queryFn: () => ContactService.getAll({ ...filters }),
    select: (res) => res.data,
    staleTime: 1000 * 60 * 5,
  });
};
