import { toast } from "sonner";
import { getApiErrorMessage } from "./apiError";

const ERROR_TOAST_ID = "app-error-toast";

export const showErrorToast = (
  err: unknown,
  fallbackMessage = "Something went wrong"
) => {
  const message = getApiErrorMessage(err, fallbackMessage);
  toast.error(message, { id: ERROR_TOAST_ID });
};