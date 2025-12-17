export type LanguageCode = "he" | "en";
export type AccountType = "admin" | "organization" | "user";

export const loginUtils = {
  isHebrewLanguage,
  getDir,
  getLanguageCode,
  getNextLanguage,
  delay,
  normalizeEmail,
  trimCredentials,
  setCredential,
  getDashboardPath,
};

function isHebrewLanguage(language: string): boolean {
  return language.toLowerCase().startsWith("he");
}

function getDir(language: string): "rtl" | "ltr" {
  return isHebrewLanguage(language) ? "rtl" : "ltr";
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

function setCredential<T extends Record<string, unknown>, K extends keyof T>(
  prev: T,
  key: K,
  value: T[K]
): T {
  return { ...prev, [key]: value };
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
