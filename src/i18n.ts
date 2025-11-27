import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import he from "./locales/he.json";
import en from "./locales/en.json";

const resources = {
  he: { translation: he },
  en: { translation: en },
};

function detectInitialLanguage(): "he" | "en" {
  const saved = localStorage.getItem("language");
  if (saved === "he" || saved === "en") return saved as "he" | "en";

  const browser = navigator.language.toLowerCase();
  if (browser.startsWith("he")) return "he";
  return "en";
}

const initialLanguage = detectInitialLanguage();

function updateDocumentDirection(language: string) {
  const isHebrew = language === "he";
  document.documentElement.dir = isHebrew ? "rtl" : "ltr";
  document.documentElement.lang = isHebrew ? "he" : "en";
}



i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

updateDocumentDirection(initialLanguage);

i18n.on("languageChanged", (language) => {
  localStorage.setItem("language", language);
  updateDocumentDirection(language);
});

export default i18n;
