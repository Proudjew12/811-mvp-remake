/**
 * Utilities and shared logic for the login flow:
 * - language helpers (he / en)
 * - generic delay helper
 * - email normalization
 * - credential trimming
 * - dashboard routing by account type
 */

export type LanguageCode = "he" | "en";

/**
 * Returns true if the given i18n language string represents Hebrew.
 *
 * Example:
 *  isHebrewLanguage("he")          -> true
 *  isHebrewLanguage("he-IL")       -> true
 *  isHebrewLanguage("en")          -> false
 */
export function isHebrewLanguage(language: string): boolean {
  return language.toLowerCase().startsWith("he");
}

/**
 * Normalizes any i18n language string to a concrete LanguageCode we support.
 *
 * Examples:
 *  getLanguageCode("he")    -> "he"
 *  getLanguageCode("he-IL") -> "he"
 *  getLanguageCode("en-US") -> "en"
 */
export function getLanguageCode(language: string): LanguageCode {
  return isHebrewLanguage(language) ? "he" : "en";
}

/**
 * Returns the "next" language for the toggle button on the login screen.
 *
 * If the current language is Hebrew -> returns "en"
 * Otherwise -> returns "he"
 */
export function getNextLanguage(language: string): LanguageCode {
  const current = getLanguageCode(language);
  return current === "he" ? "en" : "he";
}

/**
 * Simple async delay helper used to simulate network latency.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Normalize email for comparison and demo-account lookup:
 * - trim whitespace
 * - lowercase
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Generic helper to trim email/password fields on any credentials-like object.
 */
export function trimCredentials<
  T extends { email?: string; password?: string }
>(credentials: T): T {
  return {
    ...credentials,
    email: credentials.email?.trim() ?? "",
    password: credentials.password?.trim() ?? "",
  };
}

/**
 * Account types used in routing & demo accounts.
 */
export type AccountType = "admin" | "organization" | "user";

/**
 * Utility used for exhaustive checks in switches.
 */
export function assertNever(value: never, message: string): never {
  throw new Error(`${message}: ${String(value)}`);
}

/**
 * Maps an account type to the correct dashboard route.
 */
export function getDashboardPath(accountType: AccountType): string {
  switch (accountType) {
    case "admin":
      return "/admin/dashboard";
    case "organization":
      return "/organization/dashboard";
    case "user":
      return "/user/dashboard";
    default:
      return assertNever(
        accountType as never,
        "Unknown accountType in getDashboardPath"
      );
  }
}
