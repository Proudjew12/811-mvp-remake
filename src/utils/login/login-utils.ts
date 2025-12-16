export type LanguageCode = "he" | "en";
export type AccountType = "admin" | "organization" | "user";

export const loginUtils = {
  isHebrewLanguage,
  getLanguageCode,
  getNextLanguage,
  delay,
  normalizeEmail,
  trimCredentials,
  getDashboardPath,
};

function isHebrewLanguage(language: string): boolean {
  return language.toLowerCase().startsWith("he");
}

function getLanguageCode(language: string): LanguageCode {
  return isHebrewLanguage(language) ? "he" : "en";
}

function getNextLanguage(language: string): LanguageCode {
  const current = getLanguageCode(language);
  return current === "he" ? "en" : "he";
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function trimCredentials<T extends { email?: string; password?: string }>(
  credentials: T
): T {
  return {
    ...credentials,
    email: credentials.email?.trim() ?? "",
    password: credentials.password?.trim() ?? "",
  };
}

function getDashboardPath(accountType: AccountType): string {
  switch (accountType) {
    case "admin":
      return "/admin/dashboard";
    case "organization":
      return "/organization/dashboard";
    case "user":
      return "/user/dashboard";
    default:
      return assertNever(accountType as never, "Unknown accountType");
  }
}

function assertNever(value: never, message: string): never {
  throw new Error(`${message}: ${String(value)}`);
}
