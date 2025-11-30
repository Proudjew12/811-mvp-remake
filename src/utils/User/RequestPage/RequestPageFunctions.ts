// src/utils/User/RequestPage/RequestPageFunctions.ts

import {
  AssistanceCategoryId,
  CategoryDetailsMap,
} from "../../../services/RequestPage/UserRequestPage.service";

/**
 * Returns a BCP-47 locale string based on the UI language direction.
 */
export function getLocaleFromIsHebrew(isHebrew: boolean): string {
  return isHebrew ? "he-IL" : "en-GB";
}

/**
 * Keeps only digits in a phone input field.
 *
 * Examples:
 *  "050-1234567"   -> "0501234567"
 *  "+972 50-1234"  -> "972501234"
 */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Toggles a top-level assistance category selection.
 * - If category is selected -> remove it and clear its details.
 * - If not selected -> add it.
 */
export function toggleCategory(
  categories: AssistanceCategoryId[],
  categoryDetails: CategoryDetailsMap,
  categoryId: AssistanceCategoryId
): {
  categories: AssistanceCategoryId[];
  categoryDetails: CategoryDetailsMap;
} {
  const exists = categories.includes(categoryId);

  if (exists) {
    return {
      categories: categories.filter((id) => id !== categoryId),
      categoryDetails: {
        ...categoryDetails,
        [categoryId]: [],
      },
    };
  }

  return {
    categories: [...categories, categoryId],
    categoryDetails: { ...categoryDetails },
  };
}

/**
 * Toggles a specific option inside a category.
 *
 * Also keeps category selection in sync:
 * - If at least one option is selected, the category must be selected.
 * - If no options remain, the category is removed from the list.
 */
export function toggleCategoryDetail(
  categories: AssistanceCategoryId[],
  categoryDetails: CategoryDetailsMap,
  categoryId: AssistanceCategoryId,
  optionId: string
): {
  categories: AssistanceCategoryId[];
  categoryDetails: CategoryDetailsMap;
} {
  const current = categoryDetails[categoryId] || [];
  const exists = current.includes(optionId);

  const updated = exists
    ? current.filter((id) => id !== optionId)
    : [...current, optionId];

  let nextCategories = categories;
  const inCategories = nextCategories.includes(categoryId);

  if (updated.length && !inCategories) {
    nextCategories = [...nextCategories, categoryId];
  } else if (!updated.length && inCategories) {
    nextCategories = nextCategories.filter((id) => id !== categoryId);
  }

  return {
    categories: nextCategories,
    categoryDetails: {
      ...categoryDetails,
      [categoryId]: updated,
    },
  };
}

/**
 * Adds newly selected files to the existing attachments list.
 */
export function appendAttachments(existing: File[], next: File[]): File[] {
  if (!next.length) return existing;
  return [...existing, ...next];
}

/**
 * Extracts a list of file names from File objects.
 * Used when saving snapshots to localStorage.
 */
export function extractAttachmentNames(files: File[]): string[] {
  return files.map((file) => file.name);
}
