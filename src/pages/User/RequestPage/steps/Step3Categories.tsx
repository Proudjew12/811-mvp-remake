import { Dispatch, SetStateAction, ReactNode } from "react";
import Button from "../../../../components/button/button";
import { RequestFormData } from "../UserRequestPage";
import {
  AssistanceCategory,
  AssistanceCategoryId,
  CategoryDetailsMap,
} from "../../../../services/RequestPage/UserRequestPage.service";
import { CategoryCard } from "../../../../components/RequestPage/CategoryCard";

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
    <section className="request-step">
      <h2 className="request-step__title">{t("userRequest.step3.title")}</h2>

      <div className="request-step__actions flex">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClearSelection}
        >
          {t("userRequest.clearSelection")}
        </Button>
      </div>

      <div className="request-categories grid">
        {assistanceCategories.map((category) => {
          const isActive = form.categories.includes(category.id);
          const selectedOptions = form.categoryDetails[category.id] || [];
          const label = isHebrew ? category.labelHe : category.labelEn;
          const options = category.options ?? [];

          return (
            <div key={category.id} className="request-category flex column">
              <CategoryCard
                id={category.id}
                label={label}
                isActive={isActive}
                onToggle={onToggleCategory}
              />

              {options.length > 0 && (
                <div className="request-category__options flex">
                  {options.map((option) => {
                    const isSelected = selectedOptions.includes(option.id);
                    const optionClassName =
                      "request-category__option" +
                      (isSelected ? " request-category__option--active" : "");
                    const optionLabel = isHebrew
                      ? option.labelHe
                      : option.labelEn;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={optionClassName}
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

      <footer className="request-step-footer flex">
        <Button type="button" variant="secondary" onClick={onPreviousStep}>
          ← {t("footer.previous")}
        </Button>

        {renderProgressDots()}

        <Button type="button" variant="primary" onClick={onNextStep}>
          {t("footer.next")} →
        </Button>
      </footer>
    </section>
  );
}
