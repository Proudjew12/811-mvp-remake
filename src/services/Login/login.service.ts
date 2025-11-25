export const loginService = {
  login,
  validateCredentials,
  getDemoCredentials,
  getErrorMessage,
  getEmptyCredentials,
};

/** Credentials required for login */
export type LoginCredentials = {
  email: string;
  password: string;
};

/** Allowed types of demo accounts */
export type DemoAccountKey = "organization" | "admin" | "requester";

/** Shape of the demo accounts map */
type DemoAccountsMap = Record<DemoAccountKey, LoginCredentials>;

/** Predefined demo accounts for quick testing */
const demoAccounts: DemoAccountsMap = {
  organization: { email: "org@demo.com", password: "org1234" },
  admin: { email: "admin@demo.com", password: "admin1234" },
  requester: { email: "requester@demo.com", password: "request1234" },
};

/** Custom error used for login failures */
class LoginError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "LoginError";
    this.status = status;
  }
}

/** Simulate network delay (for mock login before we have a real API) */
function simulateNetworkDelay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Validate login credentials on the client side.
 * Returns a translated error message string or null if everything is valid.
 */
function validateCredentials(credentials: LoginCredentials): string | null {
  const email = credentials.email.trim();
  const password = credentials.password.trim();

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

/**
 * Perform the login action.
 * For now it checks against demo accounts. Later this will call the real API.
 */
async function login(credentials: LoginCredentials): Promise<void> {
  // later you can replace this body with axios:
  // const response = await axios.post("/api/auth/login", credentials);

  await simulateNetworkDelay(500);

  const matchingDemoAccount = Object.values(demoAccounts).find(
    (account) =>
      account.email.toLowerCase() === credentials.email.toLowerCase() &&
      account.password === credentials.password
  );

  if (!matchingDemoAccount) {
    throw new LoginError("דוא״ל או סיסמה שגויים", 401);
  }

  // with real API you can return token/user instead of void
}

/** Get predefined demo credentials for a specific demo account type */
function getDemoCredentials(key: DemoAccountKey): LoginCredentials | null {
  return demoAccounts[key] ?? null;
}

/** Map any error object into a user-facing error message */
function getErrorMessage(error: unknown): string {
  if (error instanceof LoginError) return error.message;
  if (error instanceof Error) return error.message;
  return "ההתחברות נכשלה, נסו שוב";
}

/** Helper to create an empty credentials object */
function getEmptyCredentials(): LoginCredentials {
  return { email: "", password: "" };
}
