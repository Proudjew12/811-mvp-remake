import Swal from "sweetalert2";
import {
  buildWelcomeTitle,
  extractUsername,
  type AlertLanguage,
} from "@utils/notifications/alert-functions";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

export function showWelcomeToast(email: string, language: AlertLanguage) {
  const username = extractUsername(email);
  if (!username) return;

  const title = buildWelcomeTitle(username, language);

  Toast.fire({
    icon: "success",
    title,
  });
}

export function showSuccessToast(message: string) {
  Toast.fire({
    icon: "success",
    title: message,
  });
}

export function showErrorToast(message: string) {
  Toast.fire({
    icon: "error",
    title: message,
  });
}
