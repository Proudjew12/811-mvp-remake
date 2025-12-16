export const loginService = {
  login,
  runLoginFlow,
  validateCredentials,
  getDemoCredentials,
  getErrorMessage,
  getEmptyCredentials,
};

import { loginUtils, type AccountType } from "@utils/login/login-utils";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResult = {
  email: string;
  accountType: AccountType;
};

export type DemoAccountKey = AccountType;

export type LoginFlowResult = {
  loginResult: LoginResult;
  redirectPath: string;
  lang: "he" | "en";
};

class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

const demoAccounts: Record<DemoAccountKey, LoginCredentials> = {
  admin: { email: "admin@demo.com", password: "admin123" },
  organization: { email: "org@demo.com", password: "org123" },
  user: { email: "user@demo.com", password: "user123" },
};

async function runLoginFlow(
  credentials: LoginCredentials,
  currentLanguage: string
): Promise<LoginFlowResult> {
  const validationError = validateCredentials(credentials);
  if (validationError) throw new LoginError(validationError);

  const loginResult = await login(credentials);

  return {
    loginResult,
    redirectPath: loginUtils.getDashboardPath(loginResult.accountType),
    lang: loginUtils.getLanguageCode(currentLanguage),
  };
}

async function login(credentials: LoginCredentials): Promise<LoginResult> {
  const sanitized = loginUtils.trimCredentials(credentials);
  const email = loginUtils.normalizeEmail(sanitized.email);
  const password = sanitized.password;

  await loginUtils.delay(400);

  const entry = (
    Object.entries(demoAccounts) as [DemoAccountKey, LoginCredentials][]
  ).find(([, demo]) => loginUtils.normalizeEmail(demo.email) === email);

  if (!entry) throw new LoginError("משתמש לא נמצא. בדקו את כתובת האימייל.");

  const [accountType, demoCredentials] = entry;

  if (demoCredentials.password !== password)
    throw new LoginError("הסיסמה אינה נכונה.");

  return { email: demoCredentials.email, accountType };
}

function validateCredentials(credentials: LoginCredentials): string | null {
  const { email, password } = loginUtils.trimCredentials(credentials);

  if (!email || !password) return "יש למלא אימייל וסיסמה.";

  const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailPattern.test(email)) return "כתובת האימייל אינה תקינה.";

  if (password.length < 4) return "הסיסמה צריכה להכיל לפחות 4 תווים.";

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
