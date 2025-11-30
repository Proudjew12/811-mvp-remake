export const requestedPageService = {
  getDistricts,
  getDistrictById,
  getCitiesByDistrict,
  getCategories,
  getCategoryById,
  getEmptyCategoryDetails,
  saveRequestSnapshot,
  loadRequestSnapshot,
  clearRequestSnapshot,
};

export type DistrictId = "north" | "haifa" | "center" | "jerusalem" | "south";

export type City = {
  id: string;
  nameHe: string;
  nameEn: string;
};

export type District = {
  id: DistrictId;
  nameHe: string;
  nameEn: string;
  cities: City[];
};

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
  | "supportToHqNgo"
  | "reportingInformation";

export type SubCategoryOption = {
  id: string;
  labelHe: string;
  labelEn: string;
};

export type AssistanceCategory = {
  id: AssistanceCategoryId;
  labelHe: string;
  labelEn: string;
  options?: SubCategoryOption[];
};

export type CategoryDetailsMap = Record<AssistanceCategoryId, string[]>;

export type UserRequestSnapshot = {
  recipientName: string;
  recipientPhone: string;
  requestTitle: string;
  district: DistrictId | "";
  city: string;
  street: string;
  categories: AssistanceCategoryId[];
  categoryDetails: CategoryDetailsMap;
  needsTransport: boolean | null;
  needsVolunteers: boolean | null;
  attachments: string[];
  detailsTitle: string;
  detailsDescription: string;
  savedAt: string;
};

const STORAGE_KEY = "811:userRequest:last";

const districts: District[] = [
  {
    id: "north",
    nameHe: "מחוז צפון",
    nameEn: "Northern district",
    cities: [
      { id: "kiryatShmona", nameHe: "קריית שמונה", nameEn: "Kiryat Shmona" },
      { id: "safed", nameHe: "צפת", nameEn: "Safed" },
      { id: "tiberias", nameHe: "טבריה", nameEn: "Tiberias" },
      { id: "nahariya", nameHe: "נהריה", nameEn: "Nahariya" },
      { id: "akko", nameHe: "עכו", nameEn: "Akko" },
      { id: "karmiel", nameHe: "כרמיאל", nameEn: "Karmiel" },
    ],
  },
  {
    id: "haifa",
    nameHe: "מחוז חיפה",
    nameEn: "Haifa district",
    cities: [
      { id: "haifaCity", nameHe: "חיפה", nameEn: "Haifa" },
      { id: "kiryatAta", nameHe: "קריית אתא", nameEn: "Kiryat Ata" },
      { id: "kiryatBialik", nameHe: "קריית ביאליק", nameEn: "Kiryat Bialik" },
      { id: "nesher", nameHe: "נשר", nameEn: "Nesher" },
      { id: "tiratCarmel", nameHe: "טירת כרמל", nameEn: "Tirat Carmel" },
    ],
  },
  {
    id: "center",
    nameHe: "מחוז מרכז",
    nameEn: "Central district",
    cities: [
      { id: "telAviv", nameHe: "תל אביב-יפו", nameEn: "Tel Aviv-Yafo" },
      { id: "ramatGan", nameHe: "רמת גן", nameEn: "Ramat Gan" },
      { id: "givatayim", nameHe: "גבעתיים", nameEn: "Giv'atayim" },
      { id: "petahTikva", nameHe: "פתח תקווה", nameEn: "Petah Tikva" },
      { id: "rishonLezion", nameHe: "ראשון לציון", nameEn: "Rishon Lezion" },
      { id: "rehovot", nameHe: "רחובות", nameEn: "Rehovot" },
    ],
  },
  {
    id: "jerusalem",
    nameHe: "מחוז ירושלים",
    nameEn: "Jerusalem district",
    cities: [
      { id: "jerusalemCity", nameHe: "ירושלים", nameEn: "Jerusalem" },
      { id: "maleAdumim", nameHe: "מעלה אדומים", nameEn: "Ma'ale Adumim" },
      { id: "beitShemesh", nameHe: "בית שמש", nameEn: "Beit Shemesh" },
      { id: "mevasseret", nameHe: "מבשרת ציון", nameEn: "Mevasseret Zion" },
    ],
  },
  {
    id: "south",
    nameHe: "מחוז דרום",
    nameEn: "Southern district",
    cities: [
      { id: "beerSheva", nameHe: "באר שבע", nameEn: "Be'er Sheva" },
      { id: "ashdod", nameHe: "אשדוד", nameEn: "Ashdod" },
      { id: "ashkelon", nameHe: "אשקלון", nameEn: "Ashkelon" },
      { id: "kiryatGat", nameHe: "קריית גת", nameEn: "Kiryat Gat" },
      { id: "kiryatMalachi", nameHe: "קריית מלאכי", nameEn: "Kiryat Malachi" },
      { id: "ofakim", nameHe: "אופקים", nameEn: "Ofakim" },
    ],
  },
];

const assistanceCategories: AssistanceCategory[] = [
  {
    id: "food",
    labelHe: "מזון",
    labelEn: "Food",
    options: [
      { id: "hotMeals", labelHe: "מנות חמות", labelEn: "Hot meals" },
      { id: "foodPackages", labelHe: "חבילות מזון", labelEn: "Food packages" },
      { id: "babyFood", labelHe: "מזון לתינוקות", labelEn: "Baby food" },
      {
        id: "specialFood",
        labelHe: "מזון מיוחד (צליאק, סוכרת)",
        labelEn: "Special food (celiac, diabetes)",
      },
    ],
  },
  {
    id: "transport",
    labelHe: "הסעות ותחבורה",
    labelEn: "Transportation",
    options: [
      {
        id: "families",
        labelHe: "הסעות למשפחות",
        labelEn: "Rides for families",
      },
      {
        id: "hospitals",
        labelHe: "הסעות לבתי חולים",
        labelEn: "Rides to hospitals",
      },
      { id: "shuttles", labelHe: "שאטלים קבועים", labelEn: "Fixed shuttles" },
      { id: "fuel", labelHe: "סיוע בדלק", labelEn: "Fuel assistance" },
    ],
  },
  {
    id: "logistics",
    labelHe: "לוגיסטיקה ושינוע",
    labelEn: "Logistics & delivery",
    options: [
      { id: "warehouses", labelHe: "מחסנים", labelEn: "Warehouses" },
      {
        id: "equipmentTransport",
        labelHe: "שינוע ציוד",
        labelEn: "Equipment transport",
      },
      {
        id: "loading",
        labelHe: "העמסה ופריקה",
        labelEn: "Loading / unloading",
      },
      {
        id: "fieldDistribution",
        labelHe: "חלוקה בשטח",
        labelEn: "Field distribution",
      },
    ],
  },
  {
    id: "personalEquipment",
    labelHe: "ציוד אישי",
    labelEn: "Personal equipment",
    options: [
      { id: "clothing", labelHe: "ביגוד", labelEn: "Clothing" },
      { id: "hygiene", labelHe: "היגיינה אישית", labelEn: "Personal hygiene" },
      {
        id: "blankets",
        labelHe: "שמיכות ושקי שינה",
        labelEn: "Blankets & sleeping bags",
      },
      { id: "babyGear", labelHe: "ציוד לתינוקות", labelEn: "Baby equipment" },
    ],
  },
  {
    id: "housingCommunity",
    labelHe: "דיור ואירוח קהילתי",
    labelEn: "Housing & community hosting",
    options: [
      {
        id: "familyHosting",
        labelHe: "אירוח משפחות",
        labelEn: "Hosting families",
      },
      { id: "rooms", labelHe: "חדרי אירוח", labelEn: "Guest rooms" },
      {
        id: "communitySpace",
        labelHe: "מרחב קהילתי",
        labelEn: "Community space",
      },
      {
        id: "temporaryHousing",
        labelHe: "דיור ארעי",
        labelEn: "Temporary housing",
      },
    ],
  },
  {
    id: "shelters",
    labelHe: "מקלטים ומרחבים מוגנים",
    labelEn: "Shelters & safe rooms",
    options: [
      {
        id: "preparation",
        labelHe: "הכשרת מקלטים",
        labelEn: "Preparing shelters",
      },
      {
        id: "cleaning",
        labelHe: "ניקיון ותחזוקה",
        labelEn: "Cleaning & maintenance",
      },
      {
        id: "basicEquipment",
        labelHe: "ציוד בסיסי",
        labelEn: "Basic equipment",
      },
      {
        id: "signage",
        labelHe: "שילוט והכוונה",
        labelEn: "Signage & guidance",
      },
    ],
  },
  {
    id: "volunteers",
    labelHe: "מתנדבים",
    labelEn: "Volunteers",
    options: [
      {
        id: "oneTime",
        labelHe: "התנדבות חד-פעמית",
        labelEn: "One-time volunteering",
      },
      {
        id: "ongoing",
        labelHe: "התנדבות קבועה",
        labelEn: "Ongoing volunteering",
      },
      {
        id: "professional",
        labelHe: "התנדבות מקצועית",
        labelEn: "Professional volunteering",
      },
      {
        id: "remote",
        labelHe: "התנדבות מרחוק",
        labelEn: "Remote volunteering",
      },
    ],
  },
  {
    id: "mentalHealth",
    labelHe: "בריאות הנפש",
    labelEn: "Mental health",
    options: [
      { id: "supportCalls", labelHe: "שיחות תמיכה", labelEn: "Support calls" },
      {
        id: "groups",
        labelHe: "קבוצות תמיכה",
        labelEn: "Support groups",
      },
      { id: "kids", labelHe: "ליווי לילדים", labelEn: "Support for children" },
      {
        id: "families",
        labelHe: "ליווי למשפחות",
        labelEn: "Support for families",
      },
    ],
  },
  {
    id: "educationEquipment",
    labelHe: "ציוד למוסדות חינוך וקהילה",
    labelEn: "Education & community equipment",
    options: [
      { id: "learning", labelHe: "ציוד לימודי", labelEn: "Learning materials" },
      {
        id: "digital",
        labelHe: "ציוד דיגיטלי",
        labelEn: "Digital equipment",
      },
      { id: "furniture", labelHe: "ריהוט", labelEn: "Furniture" },
      {
        id: "games",
        labelHe: "משחקים ופעילויות",
        labelEn: "Games & activities",
      },
    ],
  },
  {
    id: "maintenanceInfrastructure",
    labelHe: "תחזוקה ותשתיות",
    labelEn: "Maintenance & infrastructure",
    options: [
      {
        id: "electricity",
        labelHe: "תיקוני חשמל",
        labelEn: "Electrical repairs",
      },
      { id: "water", labelHe: "תיקוני מים", labelEn: "Water repairs" },
      {
        id: "deepCleaning",
        labelHe: "ניקיון יסודי",
        labelEn: "Deep cleaning",
      },
      { id: "fieldWork", labelHe: "עבודות שטח", labelEn: "Field work" },
    ],
  },
  {
    id: "supportToHqNgo",
    labelHe: 'סיוע לחמ"ל/עמותה',
    labelEn: "Support to HQ / NGO",
    options: [
      { id: "office", labelHe: "ציוד משרדי", labelEn: "Office equipment" },
      {
        id: "computers",
        labelHe: "מחשבים ומדפסות",
        labelEn: "Computers & printers",
      },
      {
        id: "refreshments",
        labelHe: "כיבוד לצוות",
        labelEn: "Refreshments for staff",
      },
      {
        id: "coordination",
        labelHe: "תיאום ומתנדבים",
        labelEn: "Coordination & volunteers",
      },
    ],
  },
  {
    id: "reportingInformation",
    labelHe: "דיווח ומידע",
    labelEn: "Reporting & information",
    options: [
      { id: "callCenter", labelHe: "מוקד טלפוני", labelEn: "Call center" },
      {
        id: "updating",
        labelHe: "עדכון טבלאות",
        labelEn: "Updating spreadsheets",
      },
      {
        id: "dataCollection",
        labelHe: "איסוף נתונים",
        labelEn: "Data collection",
      },
      {
        id: "verification",
        labelHe: "אימות מידע",
        labelEn: "Information verification",
      },
    ],
  },
];

function getEmptyCategoryDetails(): CategoryDetailsMap {
  const details: Partial<CategoryDetailsMap> = {};
  for (const category of assistanceCategories) {
    details[category.id] = [];
  }
  return details as CategoryDetailsMap;
}

function getDistricts(): District[] {
  return districts;
}

function getDistrictById(id: DistrictId | ""): District | null {
  if (!id) return null;
  return districts.find((district) => district.id === id) ?? null;
}

function getCitiesByDistrict(id: DistrictId | ""): City[] {
  const district = getDistrictById(id);
  return district?.cities ?? [];
}

function getCategories(): AssistanceCategory[] {
  return assistanceCategories;
}

function getCategoryById(id: AssistanceCategoryId): AssistanceCategory | null {
  return assistanceCategories.find((category) => category.id === id) ?? null;
}

function saveRequestSnapshot(snapshot: UserRequestSnapshot) {
  try {
    const serialized = JSON.stringify(snapshot);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    /* ignore */
  }
}

function loadRequestSnapshot(): UserRequestSnapshot | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized) as UserRequestSnapshot;
  } catch {
    return null;
  }
}

function clearRequestSnapshot() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
