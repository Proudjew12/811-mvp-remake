export const userRequestStepsService = {
  getSteps,
  getUrgencyOptions,
  getAidDomainOptions,
  getAssistanceTypeOptions,
  getEmptyForm,
  getTotalSteps,
};

export type RequestStepKey =
  | "who"
  | "scope"
  | "location"
  | "time"
  | "type"
  | "extra"
  | "more"
  | "summary";

export type RequestStepMeta = {
  key: RequestStepKey;
  title: string;
  subtitle?: string;
};

export type RequestForm = {
  requestTitle: string;
  receiverName: string;
  phone: string;

  helpedPeopleCount: string;
  volunteersNeeded: string;
  urgency: string;

  city: string;
  street: string;
  area: string;

  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;

  assistanceTypes: string[];

  aidDomain: string;
  needsTransport: "yes" | "no" | "";

  attachments: File[];
  moreInfo: string;
};

const steps: RequestStepMeta[] = [
  {
    key: "who",
    title: "מי צריך עזרה?",
    subtitle:
      "כתבו שם מי שצריך את העזרה. זה יכול להיות “ישראלי/ת”, או “קבוצת דיירי רח' האחים”.",
  },
  {
    key: "scope",
    title: "מה היקף הסיוע וכמה הוא דחוף?",
    subtitle:
      "ציינו לכמה אנשים מיועד הסיוע, כמה מתנדבים נדרשים ומה מידת הדחיפות.",
  },
  {
    key: "location",
    title: "לאיפה להגיע?",
    subtitle:
      'אנחנו עובדים עם מחוזות פיקוד העורף. מיקום מדויק מאפשר לשייך את הבקשה למח"ל הקרוב.',
  },
  {
    key: "time",
    title: "מתי נדרש ביצוע המשימה?",
    subtitle: "בחרו תאריך ושעה לקבלת הסיוע.",
  },
  {
    key: "type",
    title: "איזה סוג סיוע נדרש?",
    subtitle: "בחירה של תחום עוזרת לנו להפנות את הבקשה לגורמים הנכונים.",
  },
  {
    key: "extra",
    title: "כמה פרטים אחרונים…",
    subtitle: "הוסיפו תחומי סיוע, קבצים ושינוע (אם צריך).",
  },
  {
    key: "more",
    title: "משהו נוסף?",
    subtitle: "כל פרט נוסף יעזור לנו לדייק ולחסוך זמן בטיפול.",
  },
  {
    key: "summary",
    title: "סיכום בקשת הסיוע",
    subtitle: "בדקו שהכול נכון לפני שליחה.",
  },
];

const urgencyOptions = [
  { value: "", label: "התחילו/הקלידו..." },
  { value: "low", label: "לא דחוף" },
  { value: "medium", label: "דחוף" },
  { value: "high", label: "דחוף מאוד" },
];

const aidDomainOptions = [
  { value: "", label: "התחילו/הקלידו או לבחור מהרשימה..." },
  { value: "food", label: "מזון" },
  { value: "medicine", label: "תרופות" },
  { value: "transport", label: "שינוע" },
  { value: "home", label: "ציוד לבית/מחסה" },
];

const assistanceTypeOptions = [
  { value: "info", label: "דיווח ומידע" },
  { value: "volunteers", label: "מתנדבים" },
  { value: "personal", label: "ציוד אישי" },
  { value: "food", label: "מזון" },
  { value: "logistics", label: "לוגיסטיקה ושינוע" },
  { value: "health", label: "בריאות הנפש" },
  { value: "equipment", label: "ציוד למוסדות חינוך" },
  { value: "maintenance", label: "תחזוקה ותשתיות" },
  { value: "community", label: "סיוע לקהילתי" },
  { value: "animals", label: "מקלטים ומרחבים מוגנים" },
];

function getSteps() {
  return steps;
}

function getTotalSteps() {
  return steps.length;
}

function getUrgencyOptions() {
  return urgencyOptions;
}

function getAidDomainOptions() {
  return aidDomainOptions;
}

function getAssistanceTypeOptions() {
  return assistanceTypeOptions;
}

function getEmptyForm(): RequestForm {
  return {
    requestTitle: "",
    receiverName: "",
    phone: "",

    helpedPeopleCount: "",
    volunteersNeeded: "",
    urgency: "",

    city: "",
    street: "",
    area: "",

    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",

    assistanceTypes: [],

    aidDomain: "",
    needsTransport: "",

    attachments: [],
    moreInfo: "",
  };
}
