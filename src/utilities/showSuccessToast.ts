// utils/showSuccessToast.ts
import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message);
};