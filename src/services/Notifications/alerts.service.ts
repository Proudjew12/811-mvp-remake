// src/services/notifications/alerts.service.ts
import Swal from "sweetalert2";
import {
  AlertLanguage,
  extractUsername,
  buildWelcomeTitle,
} from "../../utils/Notifications/AlertFunctions";

/**
 * Global toast base config (top, auto-close, progress bar).
 */
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

/**
 * Welcome message when user logs in.
 * Shows username (before '@') + localized greeting.
 */
export function showWelcomeToast(email: string, language: AlertLanguage) {
  const username = extractUsername(email);
  if (!username) return;

  const title = buildWelcomeTitle(username, language);

  Toast.fire({
    icon: "success",
    title,
  });
}

/**
 * Generic success toast.
 */
export function showSuccessToast(message: string) {
  Toast.fire({
    icon: "success",
    title: message,
  });
}

/**
 * Generic error toast.
 */
export function showErrorToast(message: string) {
  Toast.fire({
    icon: "error",
    title: message,
  });
}
