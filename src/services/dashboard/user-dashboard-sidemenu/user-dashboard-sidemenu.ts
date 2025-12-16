export const userDashboardSidemenuService = {
  getCopy,
  getItems,
};

export type SideMenuItem = {
  id: string;
  label: string;
};

type SideMenuCopy = {
  title: string;
};

const copy: SideMenuCopy = {
  title: "מרכז בקרה",
};

const items: SideMenuItem[] = [
  { id: "my-requests", label: "ניהול הבקשות שלי" },
  { id: "tasks-in-progress", label: "ניהול משימות בטיפול" },
  { id: "place", label: "מרכז פלייס" },
  { id: "org-internal", label: "ניהול ארגון פנימי" },
  { id: "org-spec", label: "איפיון ארגונים" },
  { id: "messages", label: "מערכת הודעות" },
  { id: "system-settings", label: "הגדרות מערכת" },
];

function getCopy(): SideMenuCopy {
  return copy;
}

function getItems(): SideMenuItem[] {
  return items;
}
