import "./RequestPage.scss";

import Button from "../../../components/button/button";
import { useTranslation } from "react-i18next";
import { ChangeEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestedPageService,
  DistrictId,
  AssistanceCategoryId,
  AssistanceCategory,
  CategoryDetailsMap,
  City,
  UserRequestSnapshot,
} from "../../../services/RequestedPage/requestedPage.service";

type SummarySectionId =
  | "request"
  | "requester"
  | "location"
  | "attachments"
  | "tasks";

type RequestFormData = {
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
  attachments: File[];
  detailsTitle: string;
  detailsDescription: string;
};

const TOTAL_STEPS = 6;

const DISTRICTS = requestedPageService.getDistricts();
const ASSISTANCE_CATEGORIES = requestedPageService.getCategories();
const EMPTY_CATEGORY_DETAILS = requestedPageService.getEmptyCategoryDetails();

const emptyForm: RequestFormData = {
  recipientName: "",
  recipientPhone: "",
  requestTitle: "",
  district: "",
  city: "",
  street: "",
  categories: [],
  categoryDetails: { ...EMPTY_CATEGORY_DETAILS },
  needsTransport: null,
  needsVolunteers: null,
  attachments: [],
  detailsTitle: "",
  detailsDescription: "",
};

export default function UserRequestPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isHebrew = i18n.language.startsWith("he");

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RequestFormData>(emptyForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSections, setOpenSections] = useState<
    Record<SummarySectionId, boolean>
  >({
    request: true,
    requester: true,
    location: true,
    attachments: true,
    tasks: true,
  });

  const selectedDistrict = requestedPageService.getDistrictById(form.district);

  const selectedCity: City | undefined = selectedDistrict?.cities.find(
    (city) => city.id === form.city
  );

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onUpdateField<K extends keyof RequestFormData>(
    field: K,
    value: RequestFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function onNextStep() {
    if (step < TOTAL_STEPS - 1) {
      setStep((prev) => prev + 1);
    }
  }

  function onPreviousStep() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  function onToggleCategory(categoryId: AssistanceCategoryId) {
    setForm((prev) => {
      const exists = prev.categories.includes(categoryId);
      if (exists) {
        return {
          ...prev,
          categories: prev.categories.filter((id) => id !== categoryId),
          categoryDetails: {
            ...prev.categoryDetails,
            [categoryId]: [],
          },
        };
      }
      return { ...prev, categories: [...prev.categories, categoryId] };
    });
  }

  function onUpdateCategoryDetail(
    categoryId: AssistanceCategoryId,
    optionId: string
  ) {
    setForm((prev) => {
      const current = prev.categoryDetails[categoryId] || [];
      const exists = current.includes(optionId);
      const updated = exists
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      let categories = prev.categories;
      const inCategories = categories.includes(categoryId);

      if (updated.length && !inCategories) {
        categories = [...categories, categoryId];
      } else if (!updated.length && inCategories) {
        categories = categories.filter((id) => id !== categoryId);
      }

      return {
        ...prev,
        categories,
        categoryDetails: {
          ...prev.categoryDetails,
          [categoryId]: updated,
        },
      };
    });
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setForm((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  }

  function onSubmitRequest() {
    const snapshot: UserRequestSnapshot = {
      recipientName: form.recipientName,
      recipientPhone: form.recipientPhone,
      requestTitle: form.requestTitle,
      district: form.district,
      city: form.city,
      street: form.street,
      categories: form.categories,
      categoryDetails: form.categoryDetails,
      needsTransport: form.needsTransport,
      needsVolunteers: form.needsVolunteers,
      attachments: form.attachments.map((file) => file.name),
      detailsTitle: form.detailsTitle,
      detailsDescription: form.detailsDescription,
      savedAt: new Date().toISOString(),
    };

    requestedPageService.saveRequestSnapshot(snapshot);
    setIsSubmitted(true);
  }

  function onRenderProgressDots() {
    const dots: ReactNode[] = [];
    for (let index = 0; index < TOTAL_STEPS; index += 1) {
      const isActive = index === step;
      const isDone = index < step;

      const className = [
        "request-progress__dot",
        isActive ? "request-progress__dot--active" : "",
        isDone ? "request-progress__dot--done" : "",
      ]
        .filter(Boolean)
        .join(" ");

      dots.push(<span key={index} className={className} />);
    }
    return <div className="request-progress flex center">{dots}</div>;
  }

  function onToggleSummarySection(id: SummarySectionId) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const locale = isHebrew ? "he-IL" : "en-GB";

  if (isSubmitted) {
    return (
      <div
        className="user-request-page flex column"
        dir={isHebrew ? "rtl" : "ltr"}
      >
        <header className="user-request-header flex">
          <h1 className="user-request-header__title">
            {t("userRequest.title")}
          </h1>
          <div className="user-request-header__actions">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onToggleLanguage}
            >
              {isHebrew
                ? t("languageSwitcher.hebrew")
                : t("languageSwitcher.english")}
            </Button>
          </div>
        </header>

        <main className="request-step-main">
          <section className="request-success-card">
            <h2 className="request-step__title">
              {t("userRequest.successTitle")}
            </h2>
            <p className="request-success-text">
              {t("userRequest.successBody1")}
            </p>
            <p className="request-success-text request-success-text--muted">
              {t("userRequest.successBody2")}
            </p>

            <div className="request-success-actions flex center">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/user/dashboard")}
              >
                {t("userRequest.backToHome")}
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => navigate("/user/my-request")}
              >
                {t("userRequest.viewMyRequest")}
              </Button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div
      className="user-request-page flex column"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <header className="user-request-header flex">
        <h1 className="user-request-header__title">{t("userRequest.title")}</h1>
        <div className="user-request-header__actions">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onToggleLanguage}
          >
            {isHebrew
              ? t("languageSwitcher.hebrew")
              : t("languageSwitcher.english")}
          </Button>
        </div>
      </header>

      <main className="request-step-main">
        {step === 0 && (
          <section className="request-step">
            <h2 className="request-step__title">
              {t("userRequest.step1.title")}
            </h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-field">
                <label className="request-label">
                  {t("userRequest.step1.recipientNameLabel")}{" "}
                  <span className="request-label__required">*</span>
                </label>
                <input
                  className="request-input"
                  type="text"
                  value={form.recipientName}
                  onChange={(event) =>
                    onUpdateField("recipientName", event.target.value)
                  }
                  placeholder={t("userRequest.step1.recipientNamePlaceholder")}
                  required
                />
              </div>

              <div className="request-field">
                <label className="request-label">
                  {t("userRequest.step1.phoneLabel")}{" "}
                  <span className="request-label__required">*</span>
                </label>
                <input
                  className={
                    "request-input request-input--phone" +
                    (!isHebrew ? " request-input--ltr" : "")
                  }
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.recipientPhone}
                  onChange={(event) => {
                    const digitsOnly = event.target.value.replace(/\D/g, "");
                    onUpdateField("recipientPhone", digitsOnly);
                  }}
                  placeholder={t("userRequest.step1.phonePlaceholder")}
                  required
                />
              </div>

              <div className="request-field">
                <label className="request-label">
                  {t("userRequest.step1.requestTitleLabel")}{" "}
                  <span className="request-label__required">*</span>
                </label>
                <input
                  className="request-input"
                  type="text"
                  value={form.requestTitle}
                  onChange={(event) =>
                    onUpdateField("requestTitle", event.target.value)
                  }
                  placeholder={t("userRequest.step1.requestTitlePlaceholder")}
                  required
                />
              </div>

              <p className="request-hint">{t("userRequest.step1.hint")}</p>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/user/dashboard")}
                >
                  {t("userRequest.backToHome")}
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  {t("footer.next")} →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 1 && (
          <section className="request-step">
            <h2 className="request-step__title">
              {t("userRequest.step2.title")}
            </h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-field request-field--half">
                <label className="request-label">
                  {t("userRequest.step2.districtLabel")}{" "}
                  <span className="request-label__required">*</span>
                </label>
                <select
                  className="request-input"
                  value={form.district}
                  onChange={(event) =>
                    onUpdateField(
                      "district",
                      event.target.value as DistrictId | ""
                    )
                  }
                  required
                >
                  <option value="">
                    {t("userRequest.step2.districtPlaceholder")}
                  </option>
                  {DISTRICTS.map((district) => (
                    <option key={district.id} value={district.id}>
                      {isHebrew ? district.nameHe : district.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="request-field request-field--half">
                <label className="request-label">
                  {t("userRequest.step2.cityLabel")}{" "}
                  <span className="request-label__required">*</span>
                </label>
                <select
                  className="request-input"
                  value={form.city}
                  onChange={(event) =>
                    onUpdateField("city", event.target.value)
                  }
                  disabled={!selectedDistrict}
                  required
                >
                  <option value="">
                    {selectedDistrict
                      ? t("userRequest.step2.cityPlaceholder")
                      : t("userRequest.step2.chooseDistrictFirst")}
                  </option>
                  {requestedPageService
                    .getCitiesByDistrict(form.district)
                    .map((city: City) => (
                      <option key={city.id} value={city.id}>
                        {isHebrew ? city.nameHe : city.nameEn}
                      </option>
                    ))}
                </select>
              </div>

              <div className="request-field">
                <label className="request-label">
                  {t("userRequest.step2.streetLabel")}
                </label>
                <input
                  className="request-input"
                  type="text"
                  value={form.street}
                  onChange={(event) =>
                    onUpdateField("street", event.target.value)
                  }
                  placeholder={t("userRequest.step2.streetPlaceholder")}
                />
              </div>

              <p className="request-hint">{t("userRequest.step2.hint")}</p>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onPreviousStep}
                >
                  ← {t("footer.previous")}
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  {t("footer.next")} →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 2 && (
          <section className="request-step">
            <h2 className="request-step__title">
              {t("userRequest.step3.title")}
            </h2>

            <div className="request-step__actions flex">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    categories: [],
                    categoryDetails: { ...EMPTY_CATEGORY_DETAILS },
                  }))
                }
              >
                {t("userRequest.clearSelection")}
              </Button>
            </div>

            <div className="request-categories grid">
              {ASSISTANCE_CATEGORIES.map((category: AssistanceCategory) => {
                const isActive = form.categories.includes(category.id);
                const selectedOptions = form.categoryDetails[category.id] || [];
                const label = isHebrew ? category.labelHe : category.labelEn;
                const options = category.options ?? [];

                return (
                  <div
                    key={category.id}
                    className="request-category flex column"
                  >
                    <CategoryCard
                      id={category.id}
                      label={label}
                      isActive={isActive}
                      onToggle={onToggleCategory}
                    />
                    {options.length > 0 && (
                      <div className="request-category__options flex">
                        {options.map((option) => {
                          const isSelected = selectedOptions.includes(
                            option.id
                          );
                          const optionClassName =
                            "request-category__option" +
                            (isSelected
                              ? " request-category__option--active"
                              : "");
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
              <Button
                type="button"
                variant="secondary"
                onClick={onPreviousStep}
              >
                ← {t("footer.previous")}
              </Button>

              {onRenderProgressDots()}

              <Button type="button" variant="primary" onClick={onNextStep}>
                {t("footer.next")} →
              </Button>
            </footer>
          </section>
        )}

        {step === 3 && (
          <section className="request-step">
            <h2 className="request-step__title">
              {t("userRequest.step4.title")}
            </h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-toggle-group">
                <span className="request-toggle-group__label">
                  {t("userRequest.step4.transportQuestion")}
                </span>
                <div className="request-toggle-group__buttons flex">
                  <Button
                    type="button"
                    variant={
                      form.needsTransport === false ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsTransport", false)}
                  >
                    {t("userRequest.step4.transportNo")}
                  </Button>
                  <Button
                    type="button"
                    variant={
                      form.needsTransport === true ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsTransport", true)}
                  >
                    {t("userRequest.step4.transportYes")}
                  </Button>
                </div>
              </div>

              <div className="request-toggle-group">
                <span className="request-toggle-group__label">
                  {t("userRequest.step4.volunteersQuestion")}
                </span>
                <div className="request-toggle-group__buttons flex">
                  <Button
                    type="button"
                    variant={
                      form.needsVolunteers === false ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsVolunteers", false)}
                  >
                    {t("userRequest.step4.volunteersNo")}
                  </Button>
                  <Button
                    type="button"
                    variant={
                      form.needsVolunteers === true ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsVolunteers", true)}
                  >
                    {t("userRequest.step4.volunteersYes")}
                  </Button>
                </div>
              </div>

              <div className="request-upload">
                <p className="request-upload__label">
                  {t("userRequest.step4.uploadLabel")}
                </p>
                <label className="request-upload__dropzone flex center">
                  <span className="request-upload__hint">
                    {t("userRequest.step4.uploadPlaceholder")}
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={onFilesSelected}
                    hidden
                  />
                </label>

                {form.attachments.length > 0 && (
                  <ul className="request-upload__list clean-list">
                    {form.attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onPreviousStep}
                >
                  ← {t("footer.previous")}
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  {t("footer.next")} →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 4 && (
          <section className="request-step">
            <h2 className="request-step__title">
              {t("userRequest.step5.title")}
            </h2>
            <h3 className="request-step__subtitle">
              {t("userRequest.step5.subtitle")}
            </h3>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-field">
                <label className="request-label">
                  {t("userRequest.step5.requestTitleLabel")}
                </label>
                <input
                  className="request-input"
                  type="text"
                  value={form.detailsTitle || form.requestTitle}
                  onChange={(event) =>
                    onUpdateField("detailsTitle", event.target.value)
                  }
                  placeholder={
                    form.requestTitle ||
                    t("userRequest.step5.requestTitleLabel")
                  }
                />
              </div>

              <div className="request-field">
                <label className="request-label">
                  {t("userRequest.step5.descriptionLabel")}
                </label>
                <textarea
                  className="request-textarea"
                  value={form.detailsDescription}
                  onChange={(event) =>
                    onUpdateField("detailsDescription", event.target.value)
                  }
                  placeholder={t("userRequest.step5.descriptionPlaceholder")}
                  rows={5}
                />
              </div>

              <p className="request-hint">{t("userRequest.step5.hint")}</p>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onPreviousStep}
                >
                  ← {t("footer.previous")}
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  {t("footer.next")} →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 5 && (
          <section className="request-step">
            <h2 className="request-step__title">
              {t("userRequest.step6.title")}
            </h2>
            <h3 className="request-step__subtitle">
              {t("userRequest.step6.subtitle")}
            </h3>

            <div className="request-summary__meta">
              <span>
                {new Date().toLocaleTimeString(locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                | {new Date().toLocaleDateString(locale)}
              </span>
            </div>

            <div className="request-summary__headline">
              <div className="request-summary__headline-main flex">
                <span className="request-summary__title-text">
                  {form.requestTitle ||
                    t("userRequest.step5.requestTitleLabel")}
                </span>
                <span className="request-summary__heart">💚</span>
              </div>

              <div className="request-summary__chips flex">
                {selectedDistrict && (
                  <span className="request-chip">
                    {isHebrew
                      ? selectedDistrict.nameHe
                      : selectedDistrict.nameEn}
                  </span>
                )}
                {selectedCity && (
                  <span className="request-chip">
                    {isHebrew ? selectedCity.nameHe : selectedCity.nameEn}
                  </span>
                )}
                {form.categories.length > 0 && (
                  <span className="request-chip">
                    {
                      ASSISTANCE_CATEGORIES.find(
                        (category) => category.id === form.categories[0]
                      )?.[isHebrew ? "labelHe" : "labelEn"]
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="request-summary-accordion">
              <SummarySection
                id="request"
                title={t("userRequest.step6.sectionRequest")}
                isOpen={openSections.request}
                onToggle={onToggleSummarySection}
              >
                <p>
                  <strong>{t("userRequest.step6.assistanceTypeLabel")}</strong>{" "}
                  {form.categories.length
                    ? form.categories
                        .map((categoryId) => {
                          const category =
                            requestedPageService.getCategoryById(categoryId);
                          const baseLabel = category
                            ? isHebrew
                              ? category.labelHe
                              : category.labelEn
                            : categoryId;
                          const detailIds =
                            form.categoryDetails[categoryId] || [];
                          const optionLabels =
                            category?.options
                              ?.filter((option) =>
                                detailIds.includes(option.id)
                              )
                              .map((option) =>
                                isHebrew ? option.labelHe : option.labelEn
                              ) ?? [];
                          const suffix = optionLabels.length
                            ? ` – ${optionLabels.join(", ")}`
                            : "";
                          return `${baseLabel}${suffix}`;
                        })
                        .join(" | ")
                    : t("userRequest.step6.assistanceTypeNotSelected")}
                </p>
                {form.detailsDescription && <p>{form.detailsDescription}</p>}
              </SummarySection>

              <SummarySection
                id="requester"
                title={t("userRequest.step6.sectionRequester")}
                isOpen={openSections.requester}
                onToggle={onToggleSummarySection}
              >
                <p>
                  {form.recipientName || t("userRequest.step6.noName")} ·{" "}
                  {form.recipientPhone || t("userRequest.step6.noPhone")}
                </p>
              </SummarySection>

              <SummarySection
                id="location"
                title={t("userRequest.step6.sectionLocation")}
                isOpen={openSections.location}
                onToggle={onToggleSummarySection}
              >
                <p>
                  {(selectedDistrict &&
                    (isHebrew
                      ? selectedDistrict.nameHe
                      : selectedDistrict.nameEn)) ||
                    t("userRequest.step6.noDistrict")}
                  ,{" "}
                  {selectedCity
                    ? isHebrew
                      ? selectedCity.nameHe
                      : selectedCity.nameEn
                    : t("userRequest.step6.noCity")}
                  {form.street && `, ${form.street}`}
                </p>
              </SummarySection>

              <SummarySection
                id="attachments"
                title={t("userRequest.step6.sectionAttachments")}
                isOpen={openSections.attachments}
                onToggle={onToggleSummarySection}
              >
                {form.attachments.length ? (
                  <ul className="clean-list">
                    {form.attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{t("userRequest.step6.noFiles")}</p>
                )}
              </SummarySection>

              <SummarySection
                id="tasks"
                title={t("userRequest.step6.sectionTasks")}
                isOpen={openSections.tasks}
                onToggle={onToggleSummarySection}
              >
                <p>{t("userRequest.step6.defaultTask")}</p>
              </SummarySection>
            </div>

            <footer className="request-step-footer flex">
              <Button
                type="button"
                variant="secondary"
                onClick={onPreviousStep}
              >
                ← {t("footer.previous")}
              </Button>

              {onRenderProgressDots()}

              <Button type="button" variant="primary" onClick={onSubmitRequest}>
                {t("userRequest.submitAndSave")}
              </Button>
            </footer>
          </section>
        )}
      </main>
    </div>
  );
}

type SummarySectionProps = {
  id: SummarySectionId;
  title: string;
  isOpen: boolean;
  onToggle: (id: SummarySectionId) => void;
  children: ReactNode;
};

function SummarySection({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: SummarySectionProps) {
  return (
    <div className="request-summary-section">
      <button
        type="button"
        className="request-summary-section__header flex"
        onClick={() => onToggle(id)}
      >
        <span>{title}</span>
        <span className="request-summary-section__chevron">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="request-summary-section__body">{children}</div>
      )}
    </div>
  );
}

type CategoryCardProps = {
  id: AssistanceCategoryId;
  label: string;
  isActive: boolean;
  onToggle: (id: AssistanceCategoryId) => void;
};

function CategoryCard({ id, label, isActive, onToggle }: CategoryCardProps) {
  const className =
    "request-category-card" +
    (isActive ? " request-category-card--active" : "");

  return (
    <button type="button" className={className} onClick={() => onToggle(id)}>
      <div className="request-category-card__title">{label}</div>
    </button>
  );
}
