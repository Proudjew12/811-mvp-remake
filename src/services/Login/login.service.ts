export const loginService = {
  login,
  validateCredentials,
  getDemoCredentials,
  getErrorMessage,
  getEmptyCredentials,
};

import {
  AccountType,
  delay,
  normalizeEmail,
  trimCredentials,
} from "../../utils/Login/LoginFunctions";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResult = {
  email: string;
  accountType: AccountType;
};

export type DemoAccountKey = AccountType;

class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

/**
 * Demo accounts used by the MVP.
 * These are the only accounts the login flow currently accepts.
 */
const demoAccounts: Record<DemoAccountKey, LoginCredentials> = {
  admin: {
    email: "admin@demo.com",
    password: "admin123",
  },
  organization: {
    email: "org@demo.com",
    password: "org123",
  },
  user: {
    email: "user@demo.com",
    password: "user123",
  },
};

async function login(credentials: LoginCredentials): Promise<LoginResult> {
  // Normalize & trim once at the service level
  const sanitized = trimCredentials(credentials);
  const email = normalizeEmail(sanitized.email);
  const password = sanitized.password;

  // Simulate network delay so the UI can show a loading state
  await delay(400);

  // Find a matching demo account by normalized email
  const entry = (
    Object.entries(demoAccounts) as [DemoAccountKey, LoginCredentials][]
  ).find(([, demo]) => normalizeEmail(demo.email) === email);

  if (!entry) {
    throw new LoginError("משתמש לא נמצא. בדקו את כתובת האימייל.");
  }

  const [accountType, demoCredentials] = entry;

  if (demoCredentials.password !== password) {
    throw new LoginError("הסיסמה אינה נכונה.");
  }

  return {
    email: demoCredentials.email,
    accountType,
  };
}

/**
 * Validates credentials before sending them to the login function.
 * Returns:
 *  - string with an error message (Hebrew) if invalid
 *  - null if credentials look OK
 */
function validateCredentials(credentials: LoginCredentials): string | null {
  const { email, password } = trimCredentials(credentials);

  if (!email || !password) {
    return "יש למלא אימייל וסיסמה.";
  }

  const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailPattern.test(email)) {
    return "כתובת האימייל אינה תקינה.";
  }

  if (password.length < 4) {
    return "הסיסמה צריכה להכיל לפחות 4 תווים.";
  }

  return null;
}

function getDemoCredentials(key: DemoAccountKey): LoginCredentials | null {
  return demoAccounts[key] ?? null;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof LoginError) return error.message;
  if (error instanceof Error) return error.message;
  return "ההתחברות נכשלה, נסו שוב";
}

function getEmptyCredentials(): LoginCredentials {
  return { email: "", password: "" };
}
