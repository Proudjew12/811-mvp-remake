export const loginService = {
  login,
  validateCredentials,
  getDemoCredentials,
  getErrorMessage,
  getEmptyCredentials,
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type DemoAccountKey = "organization" | "admin" | "requester";

export type LoginResult = {
  accountType: DemoAccountKey;
  email: string;
};

type DemoAccountsMap = Record<DemoAccountKey, LoginCredentials>;

const demoAccounts: DemoAccountsMap = {
  organization: { email: "org@demo.com", password: "org1234" },
  admin: { email: "admin@demo.com", password: "admin1234" },
  requester: { email: "requester@demo.com", password: "request1234" },
};

class LoginError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "LoginError";
    this.status = status;
  }
}

function simulateNetworkDelay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

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

async function login(credentials: LoginCredentials): Promise<LoginResult> {

  await simulateNetworkDelay(500);

  const demoEntries = Object.entries(demoAccounts) as [
    DemoAccountKey,
    LoginCredentials
  ][];

  const matchingEntry = demoEntries.find(([_, account]) => {
    return (
      account.email.toLowerCase() === credentials.email.toLowerCase() &&
      account.password === credentials.password
    );
  });

  if (!matchingEntry) {
    throw new LoginError("דוא״ל או סיסמה שגויים", 401);
  }

  const [accountType, account] = matchingEntry;

  return {
    accountType,
    email: account.email,
  };
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
