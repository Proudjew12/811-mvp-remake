export type OverviewStat = {
  id: string;
  label: string;
  value: string;
  icon: string;
};

export type SuggestedTask = {
  id: string;
  title: string;
  icon: string;
  date: string;
  time: string;
  location: string;
  tag: string;
  origin: string;
};

export type InboxMessage = {
  id: string;
  time: string;
  dateLabel: string;
  title: string;
  preview: string;
};

export type MyRequestItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  status: string;
  origin: string;
};

export type UserDashboardData = {
  overviewStats: OverviewStat[];
  suggestedTasks: SuggestedTask[];
  inboxMessages: InboxMessage[];
  myRequests: MyRequestItem[];
};

export function getUserDashboardData(): UserDashboardData {
  return {
    overviewStats: [
      { id: "open", label: "בקשות פתוחות", value: "12", icon: "📌" },
      { id: "today", label: "בקשות היום", value: "5", icon: "📅" },
      { id: "week", label: "טופלו השבוע", value: "27", icon: "✅" },
      { id: "teams", label: "צוותים פעילים", value: "7", icon: "👥" },
    ],

    suggestedTasks: [
      {
        id: "t1",
        title: "חלוקת ציוד חורף למשפחות",
        icon: "🧤",
        date: "19/11/25",
        time: "10:00–13:00",
        location: "חולון",
        tag: "ציוד",
        origin: "עמותת סיוע",
      },
      {
        id: "t2",
        title: "הסעת קשישים לבדיקה רפואית",
        icon: "🚗",
        date: "21/11/25",
        time: "09:00–12:00",
        location: "תל אביב",
        tag: "הסעות",
        origin: "מוקד עירוני",
      },
    ],

    inboxMessages: [
      {
        id: "m1",
        time: "12:44",
        dateLabel: "היום",
        title: "נדרשת השלמה למסמכים",
        preview: "חסרים פרטים בבקשה #1429. לחצי לצפייה.",
      },
      {
        id: "m2",
        time: "09:10",
        dateLabel: "אתמול",
        title: "אישור משימה",
        preview: "המשימה שלך אושרה והועברה לשיוך.",
      },
      {
        id: "m3",
        time: "18:02",
        dateLabel: "12/11",
        title: "הודעה ממנהל ארגון",
        preview: "בדקי זמינות לצוות ביום שני הקרוב.",
      },
    ],

    myRequests: [
      {
        id: "r1",
        title: "בקשת ציוד לתינוקות",
        date: "18/11/25",
        location: "באר שבע",
        status: "ממתין לאישור",
        origin: "הארגון שלי",
      },
      {
        id: "r2",
        title: "סיוע בהובלה קטנה",
        date: "20/11/25",
        location: "רמת גן",
        status: "בשיבוץ",
        origin: "הארגון שלי",
      },
    ],
  };
}
