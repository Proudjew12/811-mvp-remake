export const userDashboardSidemenuService = {
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
    { id: "my-requests", label: "ניהול הבקשות שלי" },
    { id: "tasks-in-progress", label: "ניהול משימות בטיפול" },
    { id: "place", label: "מרכז פלייס" },
    { id: "org-internal", label: "ניהול ארגון פנימי" },
    { id: "org-spec", label: "איפיון ארגונים" },
    { id: "messages", label: "מערכת הודעות" },
    { id: "system-settings", label: "הגדרות מערכת" },
  ],
};

function getModel(): SideMenuModel {
  return model;
}
