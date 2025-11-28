// src/services/ui/alerts.service.ts
import Swal from "sweetalert2";

type AppLanguage = "he" | "en";

/**
 * Extracts username from an email (before the @).
 */
function extractUsername(email: string | null | undefined): string {
  if (!email) return "";
  const [username] = email.split("@");
  return username || "";
}

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
export function showWelcomeToast(email: string, language: AppLanguage) {
  const username = extractUsername(email);
  if (!username) return;

  const title =
    language === "he" ? `ברוך/ה הבא/ה, ${username}` : `Welcome, ${username}`;

  Toast.fire({
    icon: "success",
    title,
  });
}

/**
 * Generic success toast
 */
export function showSuccessToast(message: string) {
  Toast.fire({
    icon: "success",
    title: message,
  });
}

/**
 * Generic error toast
 */
export function showErrorToast(message: string) {
  Toast.fire({
    icon: "error",
    title: message,
  });
}
