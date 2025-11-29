export const requestedPageService = {
  onGetDistricts,
  onGetDistrictById,
  onGetCitiesByDistrict,
  onGetCategories,
  onGetCategoryById,
  onGetEmptyCategoryDetails,
};

export type DistrictId = "north" | "haifa" | "center" | "jerusalem" | "south";

export type City = {
  id: string;
  name: string;
};

export type District = {
  id: DistrictId;
  name: string;
  cities: City[];
};

const districts: District[] = [
  {
    id: "north",
    name: "מחוז צפון",
    cities: [
      { id: "kiryatShmona", name: "קריית שמונה" },
      { id: "safed", name: "צפת" },
      { id: "tiberias", name: "טבריה" },
      { id: "nahariya", name: "נהריה" },
      { id: "akko", name: "עכו" },
      { id: "karmiel", name: "כרמיאל" },
    ],
  },
  {
    id: "haifa",
    name: "מחוז חיפה",
    cities: [
      { id: "haifa", name: "חיפה" },
      { id: "kiryatAta", name: "קריית אתא" },
      { id: "kiryatBialik", name: "קריית ביאליק" },
      { id: "nesher", name: "נשר" },
      { id: "tiratCarmel", name: "טירת כרמל" },
    ],
  },
  {
    id: "center",
    name: "מחוז מרכז",
    cities: [
      { id: "telAviv", name: "תל אביב-יפו" },
      { id: "ramatGan", name: "רמת גן" },
      { id: "givatayim", name: "גבעתיים" },
      { id: "petahTikva", name: "פתח תקווה" },
      { id: "rishonLezion", name: "ראשון לציון" },
      { id: "rehovot", name: "רחובות" },
    ],
  },
  {
    id: "jerusalem",
    name: "מחוז ירושלים",
    cities: [
      { id: "jerusalem", name: "ירושלים" },
      { id: "maleAdumim", name: "מעלה אדומים" },
      { id: "beitShemesh", name: "בית שמש" },
      { id: "mevasseret", name: "מבשרת ציון" },
    ],
  },
  {
    id: "south",
    name: "מחוז דרום",
    cities: [
      { id: "beerSheva", name: "באר שבע" },
      { id: "ashdod", name: "אשדוד" },
      { id: "ashkelon", name: "אשקלון" },
      { id: "kiryatGat", name: "קריית גת" },
      { id: "kiryatMalachi", name: "קריית מלאכי" },
      { id: "ofakim", name: "אופקים" },
    ],
  },
];

export type AssistanceCategoryId =
  | "food"
  | "transport"
  | "logistics"
  | "personalEquipment"
  | "housingCommunity"
  | "shelters"
  | "volunteers"
  | "mentalHealth"
  | "educationEquipment"
  | "maintenanceInfrastructure"
  | "supportToHamal"
  | "reportingInformation";

export type AssistanceCategory = {
  id: AssistanceCategoryId;
  label: string;
  englishLabel: string;
  subOptions?: string[];
};

const assistanceCategories: AssistanceCategory[] = [
  {
    id: "food",
    label: "מזון",
    englishLabel: "food",
    subOptions: [
      "מנות חמות",
      "חבילות מזון",
      "מזון לתינוקות",
      "מזון מיוחד (צליאק, סוכרת)",
    ],
  },
  {
    id: "transport",
    label: "הסעות ותחבורה",
    englishLabel: "transportation",
    subOptions: [
      "הסעות למשפחות",
      "הסעות לבתי חולים",
      "שאטלים קבועים",
      "סיוע בדלק",
    ],
  },
  {
    id: "logistics",
    label: "לוגיסטיקה ושינוע",
    englishLabel: "logistics & delivery",
    subOptions: ["מחסנים", "שינוע ציוד", "העמסה ופריקה", "חלוקה בשטח"],
  },
  {
    id: "personalEquipment",
    label: "ציוד אישי",
    englishLabel: "personal equipment",
    subOptions: ["ביגוד", "היגיינה אישית", "שמיכות ושקי שינה", "ציוד לתינוקות"],
  },
  {
    id: "housingCommunity",
    label: "דיור ואירוח קהילתי",
    englishLabel: "housing & community hosting",
    subOptions: ["אירוח משפחות", "חדרי אירוח", "מרחב קהילתי", "דיור ארעי"],
  },
  {
    id: "shelters",
    label: "מקלטים ומרחבים מוגנים",
    englishLabel: "shelters & safe rooms",
    subOptions: [
      "הכשרת מקלטים",
      "ניקיון ותחזוקה",
      "ציוד בסיסי",
      "שילוט והכוונה",
    ],
  },
  {
    id: "volunteers",
    label: "מתנדבים",
    englishLabel: "volunteers",
    subOptions: [
      "התנדבות חד-פעמית",
      "התנדבות קבועה",
      "התנדבות מקצועית",
      "התנדבות מרחוק",
    ],
  },
  {
    id: "mentalHealth",
    label: "בריאות הנפש",
    englishLabel: "mental health",
    subOptions: [
      "שיחות תמיכה",
      "קבוצות תמיכה",
      "ליווי לילדים",
      "ליווי למשפחות",
    ],
  },
  {
    id: "educationEquipment",
    label: "ציוד למוסדות חינוך וקהילה",
    englishLabel: "education & community equipment",
    subOptions: ["ציוד לימודי", "ציוד דיגיטלי", "ריהוט", "משחקים ופעילויות"],
  },
  {
    id: "maintenanceInfrastructure",
    label: "תחזוקה ותשתיות",
    englishLabel: "maintenance & infrastructure",
    subOptions: ["תיקוני חשמל", "תיקוני מים", "ניקיון יסודי", "עבודות שטח"],
  },
  {
    id: "supportToHamal",
    label: 'סיוע לחמ"ל/עמותה',
    englishLabel: "support to HQ / NGO",
    subOptions: [
      "ציוד משרדי",
      "מחשבים ומדפסות",
      "כיבוד לצוות",
      "תיאום ומתנדבים",
    ],
  },
  {
    id: "reportingInformation",
    label: "דיווח ומידע",
    englishLabel: "reporting & information",
    subOptions: ["איסוף נתונים", "אימות מידע", "עדכון טבלאות", "מוקד טלפוני"],
  },
];

export type CategoryDetailsMap = Record<AssistanceCategoryId, string[]>;

function onGetEmptyCategoryDetails(): CategoryDetailsMap {
  const details: Partial<CategoryDetailsMap> = {};
  for (const category of assistanceCategories) {
    details[category.id] = [];
  }
  return details as CategoryDetailsMap;
}

function onGetDistricts(): District[] {
  return districts;
}

function onGetDistrictById(id: DistrictId | ""): District | null {
  if (!id) return null;
  return districts.find((district) => district.id === id) ?? null;
}

function onGetCitiesByDistrict(id: DistrictId | ""): City[] {
  const district = onGetDistrictById(id);
  return district?.cities ?? [];
}

function onGetCategories(): AssistanceCategory[] {
  return assistanceCategories;
}

function onGetCategoryById(
  id: AssistanceCategoryId
): AssistanceCategory | null {
  return assistanceCategories.find((category) => category.id === id) ?? null;
}
