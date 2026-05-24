import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactService } from "@/Services/contactService";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";
import type { IContact } from "@/types/IContact";

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<IContact>,
    unknown,
    string 
  >({
    mutationFn: (_id: string) => ContactService.delete(_id),

    onSuccess: (res, _id) => {
      queryClient.setQueriesData<IContact[]>(
        { queryKey: ["contacts"] },
        (old) => (old ? old.filter((item) => item._id !== _id) : old)
      );

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};