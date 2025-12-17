import type { AccountType } from "@utils/login/login-utils";

export type LoginCredentials = {
    email: string;
    password: string;
};

export type DemoAccountKey = AccountType;

export type DemoAccountItem = {
    key: DemoAccountKey;
    label: string;
    credentials: LoginCredentials;
};

export const demoAccounts: Record<DemoAccountKey, LoginCredentials> = {
    admin: { email: "admin@demo.com", password: "admin123" },
    organization: { email: "org@demo.com", password: "org123" },
    user: { email: "user@demo.com", password: "user123" },
};

export function buildDemoAccountItems(): DemoAccountItem[] {
    const keys = Object.keys(demoAccounts) as DemoAccountKey[];
    return keys.map((key) => ({
        key,
        label: key,
        credentials: demoAccounts[key],
    }));
}
