export type AlertLanguage = "he" | "en";

export function extractUsername(email: string | null | undefined): string {
  if (!email) return "";
  const trimmed = email.trim();
  if (!trimmed) return "";

  const atIndex = trimmed.indexOf("@");
  if (atIndex === -1) return trimmed;

  return trimmed.slice(0, atIndex);
}

export function buildWelcomeTitle(
  username: string,
  language: AlertLanguage
): string {
  if (!username) return "";
  return language === "he"
    ? `ברוך/ה הבא/ה, ${username}`
    : `Welcome, ${username}`;
}
