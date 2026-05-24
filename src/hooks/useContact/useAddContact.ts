import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ContactService } from "@/Services/contactService";
import type { IContact } from "@/types/IContact";
import { showSuccessToast } from "@/utilities/showSuccessToast";
import { showErrorToast } from "@/utilities/showErrorToast";
import type { ApiResponse } from "@/types/ApiResponse";

export const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<IContact>,
    unknown,
    Omit<IContact, "_id">
  >({
    mutationFn: (newContact) =>
      ContactService.create(newContact),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      showSuccessToast(res.message); 
    },

    onError: (err) => {
      showErrorToast(err);
    },
  });
};