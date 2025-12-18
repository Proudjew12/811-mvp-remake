export const userDashboardMainService = {
  getCopy,
  getStats,
  getRelevantTasks,
  getIncomingMessages,
};

type StatItem = {
  label: string;
  value: string | number;
};

type TaskItem = {
  title: string;
  place: string;
  time: string;
  date: string;
};

type IncomingMessage = {
  id: string;
  title: string;
  text: string;
};

type Copy = {
  topTitle: string;

  btnDonate: string;
  btnRequest: string;

  overviewTitle: string;
  overviewSubtitle: string;

  messagesTitle: string;
  outgoingTitle: string;
  incomingTitle: string;

  tasksInProgressTitle: string;
  tasksInProgressHint: string;
  taskPreviewTitle: string;
  taskPreviewMeta: string;

  myRequestsTitle: string;
  myRequestsHint: string;
  requestPreviewTitle: string;
  requestPreviewMeta: string;

  relevantTitle: string;
};

const stats: StatItem[] = [
  { label: "משימות פעילות", value: 12 },
  { label: "משימות שהושלמו", value: 36 },
  { label: "תרומות", value: 8 },
  { label: "בקשות חדשות", value: 6 },
  { label: "מתנדבים פעילים", value: 87 },
  { label: "זמן תגובה ממוצע (ש׳)", value: 3.1 },
  { label: "אחוז פעילות", value: 6 },
  { label: "אנשי צוות", value: 12 },
];

const relevantTasks: TaskItem[] = [
  {
    title: "חלוקת מנות מזון בבית ספר לילדי מפונים",
    place: "באר שבע",
    time: "11:00-15:00",
    date: "19/11/25",
  },
  {
    title: "חלוקת מזון למשפחות מפונות",
    place: "ירושלים",
    time: "17:00-20:00",
    date: "22/11/25",
  },
  {
    title: "אספקת ציוד חורף למקלטים בצפון",
    place: "נהריה",
    time: "09:00-14:00",
    date: "23/11/25",
  },
  {
    title: "הפעלת מתנדבים במרכז פינוי באשקלון",
    place: "אשקלון",
    time: "10:00-16:00",
    date: "24/11/25",
  },
];

const incomingMessages: IncomingMessage[] = [
  {
    id: "m1",
    title: "בקשת שייך למשימה",
    text: "שלום, יש משימה פתוחה בתחום המזון באשדוד, נשמח אם תוכלו לקחת אחריות…",
  },
  {
    id: "m2",
    title: "עדכון סטטוס משימה",
    text: "נא לעדכן את סטטוס המשימה “חלוקת ציוד חורף” עד סוף היום.",
  },
  {
    id: "m3",
    title: "תזכורת לשיוך מתנדבים",
    text: "נשארו משימות פתוחות ללא שיוך מתנדבים. אנא בדקו באזור שלכם.",
  },
  {
    id: "m4",
    title: "הודעה כללית",
    text: "מוקד 811 מעדכן על פעילות שבועית. קישור למסמך מצורף…",
  },
];

const copy: Copy = {
  topTitle: "בוקר טוב דנה, קיימות במערכת 6 משימות חדשות המתאימות לארגון",

  btnDonate: "העלאת תרומה חדשה",
  btnRequest: "הוספת בקשה חדשה",

  overviewTitle: "מבט על",
  overviewSubtitle: "נתוני פעילות חודשיים",

  messagesTitle: "מערכת הודעות למוקד 811",
  outgoingTitle: "הודעות יוצאות",
  incomingTitle: "הודעות נכנסות",

  tasksInProgressTitle: "ניהול משימות בטיפול",
  tasksInProgressHint: "משימות שהארגון משויך אליהן ונמצאות בעבודה כרגע.",
  taskPreviewTitle: "חלוקת מנות מזון בבית ספר לילדי מפונים",
  taskPreviewMeta: "באר שבע • 11:00-15:00 • 19/11/25",

  myRequestsTitle: "ניהול הבקשות שלי",
  myRequestsHint: "בקשות שהארגון העלה למערכת וממתינות לאישור/שיוך.",
  requestPreviewTitle: "אספקת ערכות יצירה וציוד בית ספר",
  requestPreviewMeta: "צפון • 17/9/25",

  relevantTitle: "משימות רלוונטיות בשבילך",
};

function getCopy(): Copy {
  return copy;
}

function getStats(): StatItem[] {
  return stats;
}

function getRelevantTasks(): TaskItem[] {
  return relevantTasks;
}

function getIncomingMessages(): IncomingMessage[] {
  return incomingMessages;
}
