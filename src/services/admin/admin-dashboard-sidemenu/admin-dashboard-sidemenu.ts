export const adminDashboardSidemenuService = {
  getModel,
};

export type SideMenuItem = {
  id: string;
  label: string;
};

export type SideMenuModel = {
  title: string;
  items: SideMenuItem[];
};

const model: SideMenuModel = {
  title: "מרכז בקרה",
  items: [
    { id: "users", label: "ניהול משתמשים" },
    { id: "call-center", label: "צוות המוקד" },
    { id: "requests-tasks", label: "בקשות ומשימות" },
    { id: "marketplace", label: "מרקט פלייס" },
    { id: "object", label: "חפץ" },
    { id: "orgs", label: "ארגונים" },
    { id: "permissions", label: "הרשאות" },
    { id: "messages", label: "מערכת הודעות" },
    { id: "settings", label: "הגדרות מערכת" },
  ],
};

function getModel(): SideMenuModel {
  return model;
}
