export const adminDashboardMainService = {
  getModel,
  getChartMaxTotal,
};

type ActionItem = {
  id: string;
  label: string;
  onClick: () => void;
};

type ChartRow = {
  label: string;
  total: number;
  parts: number[];
};

type RequestItem = {
  id: string;
  title: string;
  meta: string;
  icon: string;
};

type TaskItem = {
  id: string;
  title: string;
  meta: string;
  icon: string;
};

type OrgItem = {
  id: string;
  title: string;
  meta: string;
};

type AlertItem = {
  id: string;
  time: string;
  title: string;
  text: string;
};

type AdminDashboardModel = {
  header: {
    userName: string;
    topTitle: string;
  };
  actions: ActionItem[];
  chart: {
    icon: string;
    title: string;
    filters: { id: string; label: string }[];
    rows: ChartRow[];
  };
  requests: {
    icon: string;
    title: string;
    items: RequestItem[];
  };
  tasks: {
    icon: string;
    title: string;
    items: TaskItem[];
  };
  messages: {
    icon: string;
    title: string;
  };
  orgs: {
    icon: string;
    title: string;
    items: OrgItem[];
  };
  alerts: {
    icon: string;
    title: string;
    items: AlertItem[];
  };
};

const NOOP = () => {};

const MODEL: AdminDashboardModel = {
  header: {
    userName: "צבי אלדר",
    topTitle: "בוקר טוב צבי, קיימות במערכת 7 התראות הממתינות לטיפול",
  },

  actions: [
    { id: "add-request", label: "הוספת בקשה חדשה", onClick: NOOP },
    { id: "view-requests", label: "לצפייה בכל הבקשות", onClick: NOOP },
    { id: "view-tasks", label: "לצפייה בכל המשימות", onClick: NOOP },
    { id: "upload-donation", label: "העלאת תמונה חדשה", onClick: NOOP },
  ],

  chart: {
    icon: "📊",
    title: "מבט על - בקשות נכנסות למערכת",
    filters: [
      { id: "day", label: "יום" },
      { id: "week", label: "שבוע" },
      { id: "month", label: "חודש" },
    ],
    rows: [
      { label: "חינוך", total: 34, parts: [34] },
      { label: "מזון וחבילות", total: 20, parts: [20] },
      { label: "הסעות ותחבורה", total: 15, parts: [15] },
      { label: "ציוד אישי", total: 7, parts: [7] },
      { label: "ציוד רפואי", total: 9, parts: [9] },
      { label: "תמיכה נפשית", total: 15, parts: [15] },
    ],
  },

  requests: {
    icon: "🗂️",
    title: "בקשות חדשות",
    items: [
      {
        id: "r1",
        icon: "▦",
        title: "סיוע במתנות ליום הולדת לילדים בודדים",
        meta: "יש • ממתין לאישור",
      },
      {
        id: "r2",
        icon: "▦",
        title: "מתנדבים עוזרים לבני משפחות מילואימניקים",
        meta: "דרום • ממתין לאישור",
      },
      {
        id: "r3",
        icon: "▦",
        title: "שינוע ציוד רפואי מתרומות לאשקלון",
        meta: "בינוני • ממתין לאישור",
      },
    ],
  },

  tasks: {
    icon: "🧩",
    title: "משימות להיום/מחר",
    items: [
      {
        id: "t1",
        icon: "▦",
        title: "חלוקת ציוד חורף לחו״ם במילואים",
        meta: "20/11/25 (יומי) • 18:00 • דרום • אזור חיפה",
      },
      {
        id: "t2",
        icon: "▦",
        title: "שינוע ציוד רפואי מתרומות לאשקלון",
        meta: "21/11/25 • 12:00-14:00 • חדש • אזור מרכז",
      },
    ],
  },

  messages: {
    icon: "✉️",
    title: "מערכת שליחת הודעות",
  },

  orgs: {
    icon: "👥",
    title: "ארגונים פעילים במערכת",
    items: [
      { id: "o1", title: "חמ״ל שכונה הצפוני", meta: "בקשות: 1 • משימות: 3" },
      { id: "o2", title: "לב אחד", meta: "בקשות: 0 • משימות: 5" },
      { id: "o3", title: "עומדים יחד", meta: "בקשות: 2 • משימות: 2" },
      { id: "o4", title: "לחימום ליבי", meta: "בקשות: 0 • משימות: 4" },
    ],
  },

  alerts: {
    icon: "🔔",
    title: "התראות",
    items: [
      {
        id: "a1",
        time: "עכשיו",
        title: "אירוע חדש",
        text: "יחידת מגירה הצפוני הגישה בקשה לגיוס מתנדבים למערכת",
      },
      {
        id: "a2",
        time: "14:37",
        title: "בדיקת סטטוס",
        text: "משימת חלוקת מזון הושלמה אך טרם אושרה",
      },
      {
        id: "a3",
        time: "12:06",
        title: "הודעה חדשה",
        text: "התקבלה הודעה חדשה מארגון במערכת",
      },
    ],
  },
};

function getModel(): AdminDashboardModel {
  return MODEL;
}

function getChartMaxTotal(rows: ChartRow[]): number {
  const totals = rows.map((r) => r.total);
  const max = totals.length ? Math.max(...totals) : 1;
  return max || 1;
}
