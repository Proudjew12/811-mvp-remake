/**
 * Languages supported for alert text.
 * Matches what we use in the rest of the app ("he" | "en").
 */
export type AlertLanguage = "he" | "en";

/**
 * Extracts username from an email (string before the @).
 *
 * Examples:
 *   extractUsername("user@example.com") -> "user"
 *   extractUsername("  admin@demo.com  ") -> "admin"
 *   extractUsername("") -> ""
 */
export function extractUsername(email: string | null | undefined): string {
  if (!email) return "";

  const trimmed = email.trim();
  if (!trimmed) return "";

  const atIndex = trimmed.indexOf("@");
  if (atIndex === -1) return trimmed;

  return trimmed.slice(0, atIndex);
}

/**
 * Builds a localized welcome title shown in toast alerts.
 *
 * Examples:
 *   buildWelcomeTitle("שני", "he") -> 'ברוך/ה הבא/ה, שני'
 *   buildWelcomeTitle("Shiki", "en") -> 'Welcome, Shiki'
 */
export function buildWelcomeTitle(
  username: string,
  language: AlertLanguage
): string {
  if (!username) return "";

  if (language === "he") {
    return `ברוך/ה הבא/ה, ${username}`;
  }

  return `Welcome, ${username}`;
}
