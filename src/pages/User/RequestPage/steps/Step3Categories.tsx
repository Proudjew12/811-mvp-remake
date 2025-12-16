import { Dispatch, SetStateAction, ReactNode } from "react";
import Button from "@components/button/button";
import { RequestFormData } from "../UserRequestPage";
import {
  AssistanceCategory,
  AssistanceCategoryId,
  CategoryDetailsMap,
} from "@services/RequestPage/UserRequestPage.service";
import { CategoryCard } from "@components/RequestPage/CategoryCard";

type Props = {
  t: (key: string) => string;
  isHebrew: boolean;
  form: RequestFormData;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onToggleCategory: (id: AssistanceCategoryId) => void;
  onUpdateCategoryDetail: (
    categoryId: AssistanceCategoryId,
    optionId: string
  ) => void;
  assistanceCategories: AssistanceCategory[];
  emptyCategoryDetails: CategoryDetailsMap;
  setForm: Dispatch<SetStateAction<RequestFormData>>;
  renderProgressDots: () => ReactNode;
};

export function Step3Categories({
  t,
  isHebrew,
  form,
  onPreviousStep,
  onNextStep,
  onToggleCategory,
  onUpdateCategoryDetail,
  assistanceCategories,
  emptyCategoryDetails,
  setForm,
  renderProgressDots,
}: Props) {
  function handleClearSelection() {
    setForm((prev) => ({
      ...prev,
      categories: [],
      categoryDetails: { ...emptyCategoryDetails },
    }));
  }

  return (
    <section className="grid request-step">
      <div className="grid step-top">
        <h2 className="request-step-title">{t("userRequest.step3.title")}</h2>

        <div className="grid step-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClearSelection}
          >
            {t("userRequest.clearSelection")}
          </Button>
        </div>
      </div>

      <div className="grid category-grid">
        {assistanceCategories.map((category) => {
          const isActive = form.categories.includes(category.id);
          const selectedOptions = form.categoryDetails[category.id] || [];
          const label = isHebrew ? category.labelHe : category.labelEn;
          const options = category.options ?? [];

          return (
            <div key={category.id} className="grid category-card-wrap">
              <CategoryCard
                id={category.id}
                label={label}
                isActive={isActive}
                onToggle={onToggleCategory}
              />

              {options.length > 0 && (
                <div className="grid category-options">
                  {options.map((option) => {
                    const isSelected = selectedOptions.includes(option.id);
                    const optionLabel = isHebrew
                      ? option.labelHe
                      : option.labelEn;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={[
                          "category-option",
                          isSelected ? "is-active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() =>
                          onUpdateCategoryDetail(category.id, option.id)
                        }
                      >
                        {optionLabel}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="grid request-footer">
        <Button type="button" variant="secondary" onClick={onPreviousStep}>
          ← {t("footer.previous")}
        </Button>

        <div className="request-footer-center">{renderProgressDots()}</div>

        <Button type="button" variant="primary" onClick={onNextStep}>
          {t("footer.next")} →
        </Button>
      </footer>
    </section>
  );
}
