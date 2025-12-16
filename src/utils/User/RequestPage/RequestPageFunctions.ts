import type {
  AssistanceCategoryId,
  CategoryDetailsMap,
} from "@services/RequestPage/UserRequestPage.service";

export function getLocaleFromIsHebrew(isHebrew: boolean): string {
  return isHebrew ? "he-IL" : "en-GB";
}

export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, "");
}

export function toggleCategory(
  categories: AssistanceCategoryId[],
  categoryDetails: CategoryDetailsMap,
  categoryId: AssistanceCategoryId
): { categories: AssistanceCategoryId[]; categoryDetails: CategoryDetailsMap } {
  const exists = categories.includes(categoryId);

  if (exists) {
    return {
      categories: categories.filter((id) => id !== categoryId),
      categoryDetails: { ...categoryDetails, [categoryId]: [] },
    };
  }

  return {
    categories: [...categories, categoryId],
    categoryDetails: { ...categoryDetails },
  };
}

export function toggleCategoryDetail(
  categories: AssistanceCategoryId[],
  categoryDetails: CategoryDetailsMap,
  categoryId: AssistanceCategoryId,
  optionId: string
): { categories: AssistanceCategoryId[]; categoryDetails: CategoryDetailsMap } {
  const current = categoryDetails[categoryId] ?? [];
  const exists = current.includes(optionId);

  const updated = exists
    ? current.filter((id) => id !== optionId)
    : [...current, optionId];

  const inCategories = categories.includes(categoryId);

  const nextCategories =
    updated.length && !inCategories
      ? [...categories, categoryId]
      : !updated.length && inCategories
      ? categories.filter((id) => id !== categoryId)
      : categories;

  return {
    categories: nextCategories,
    categoryDetails: { ...categoryDetails, [categoryId]: updated },
  };
}

export function appendAttachments(existing: File[], next: File[]): File[] {
  if (!next.length) return existing;
  return [...existing, ...next];
}

export function extractAttachmentNames(files: File[]): string[] {
  return files.map((file) => file.name);
}
