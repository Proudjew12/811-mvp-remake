// src/services/auth.service.ts

export const authService = {
  login: _login,
  validateCredentials: _validateCredentials,
  getDemoCredentials: _getDemoCredentials,
  getErrorMessage: _getErrorMessage,
  getEmptyCreds: _getEmptyCreds,
};


export type LoginCredentials = {
  email: string;
  password: string;
};

export type DemoAccountKey = "organization" | "admin" | "requester";

type DemoAccountsMap = Record<DemoAccountKey, LoginCredentials>;

const DEMO_ACCOUNTS: DemoAccountsMap = {
  organization: { email: "org@demo.com", password: "org1234" },
  admin: { email: "admin@demo.com", password: "admin1234" },
  requester: { email: "requester@demo.com", password: "request1234" },
};

class AuthError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

function _delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function _login(creds: LoginCredentials): Promise<void> {
  const { email, password } = creds;

  // TODO: replace with axios when backend is ready
  // example:
  // const res = await axios.post("/api/auth/login", { email, password });

  await _delay(500);

  // temporary mock against DEMO_ACCOUNTS
  const isDemoUser = Object.values(DEMO_ACCOUNTS).some(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!isDemoUser) {
    throw new AuthError("דוא״ל או סיסמה שגויים", 401);
  }

  // with real API, validate response here and throw if needed
}

function _validateCredentials(creds: LoginCredentials): string | null {
  const email = creds.email.trim();
  const password = creds.password.trim();

  if (!email || !password) {
    return 'נא למלא דוא״ל וסיסמה';
  }

  if (!email.includes("@")) {
    return "דוא״ל לא תקין";
  }

  if (password.length < 4) {
    return "הסיסמה צריכה להיות לפחות 4 תווים";
  }

  return null;
}

function _getDemoCredentials(key: DemoAccountKey): LoginCredentials | null {
  return DEMO_ACCOUNTS[key] ?? null;
}

function _getErrorMessage(error: unknown): string {
  if (error instanceof AuthError) return error.message;
  if (error instanceof Error) return error.message;
  return "ההתחברות נכשלה, נסו שוב";
}

function _getEmptyCreds(): LoginCredentials {
  return { email: "", password: "" };
}