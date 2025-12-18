import type {
  RequestForm,
  RequestStepKey,
} from "@/services/user/user-request-page/steps";

export const userRequestPageService = {
  buildNavState,
  getNextIndex,
  getPrevIndex,
  toggleAssistanceType,
};

export type UserRequestStepKey = RequestStepKey;

function trim(v: string) {
  return (v ?? "").trim();
}

function digitsOnly(v: string) {
  return (v ?? "").replace(/\D/g, "");
}

function isFilled(v: string) {
  return trim(v).length > 0;
}

function isPhoneValid(prefixRaw: string, numberRaw: string) {
  const prefix = digitsOnly(prefixRaw);
  const num = digitsOnly(numberRaw);

  if (!prefix || !num) return false;

  // As you requested: total digits must be between 8 and 10 (inclusive)
  const totalLen = prefix.length + num.length;
  return totalLen >= 8 && totalLen <= 10;
}

function getReasonsForStep(
  stepKey: UserRequestStepKey,
  form: RequestForm
): string[] {
  const reasons: string[] = [];

  if (stepKey === "who") {
    if (!isFilled(form.requestTitle)) reasons.push("כותרת הבקשה");
    if (!isFilled(form.receiverName)) reasons.push("שם מקבל הסיוע");
    if (!isFilled(form.phonePrefix)) reasons.push("קידומת טלפון");
    if (!isFilled(form.phoneNumber)) reasons.push("מספר טלפון");
    if (
      isFilled(form.phonePrefix) &&
      isFilled(form.phoneNumber) &&
      !isPhoneValid(form.phonePrefix, form.phoneNumber)
    ) {
      reasons.push("טלפון לא תקין (8–10 ספרות יחד)");
    }
  }

  if (stepKey === "scope") {
    if (!isFilled(form.helpedPeopleCount)) reasons.push("כמות אנשים");
    if (
      isFilled(form.volunteersNeeded) &&
      digitsOnly(form.volunteersNeeded) !== trim(form.volunteersNeeded)
    ) {
      reasons.push("כמות מתנדבים (ספרות בלבד)");
    }
    if (!isFilled(form.urgency)) reasons.push("דחיפות");
    if (
      isFilled(form.helpedPeopleCount) &&
      digitsOnly(form.helpedPeopleCount) !== trim(form.helpedPeopleCount)
    ) {
      reasons.push("כמות אנשים (ספרות בלבד)");
    }
  }

  if (stepKey === "location") {
    if (!isFilled(form.area)) reasons.push("אזור");
    if (!isFilled(form.city)) reasons.push("עיר");
    if (!isFilled(form.street)) reasons.push("רחוב");
  }

  if (stepKey === "time") {
    if (!isFilled(form.startTime)) reasons.push("שעת התחלה");
    if (!isFilled(form.startDate)) reasons.push("תאריך התחלה");
    if (!isFilled(form.endTime)) reasons.push("שעת סיום");
    if (!isFilled(form.endDate)) reasons.push("תאריך סיום");
  }

  if (stepKey === "type") {
    if (!form.assistanceTypes.length) reasons.push("סוג סיוע");
  }

  if (stepKey === "extra") {
    if (!isFilled(form.aidDomain)) reasons.push("תחום סיוע");
    if (!isFilled(form.needsTransport)) reasons.push("נדרש שינוע?");
  }

  return reasons;
}

function buildNavState(
  stepIdx: number,
  totalSteps: number,
  stepKey: UserRequestStepKey,
  form: RequestForm
) {
  const isFirst = stepIdx <= 0;
  const isLast = stepIdx >= totalSteps - 1;

  const reasons = isLast ? [] : getReasonsForStep(stepKey, form);
  const canGoNext = reasons.length === 0;

  return { isFirst, isLast, canGoNext, reasons };
}

function getNextIndex(current: number, totalSteps: number) {
  return Math.min(current + 1, totalSteps - 1);
}

function getPrevIndex(current: number, totalSteps: number) {
  return Math.max(current - 1, 0);
}

function toggleAssistanceType(prev: RequestForm, value: string): RequestForm {
  const exists = prev.assistanceTypes.includes(value);
  const next = exists
    ? prev.assistanceTypes.filter((v) => v !== value)
    : [...prev.assistanceTypes, value];

  return { ...prev, assistanceTypes: next };
}
