import { ChangeEvent, useState, ReactNode } from "react";
import "./RequestPage.scss";

import Button from "../../../components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  requestedPageService,
  DistrictId,
  AssistanceCategoryId,
  AssistanceCategory,
  CategoryDetailsMap,
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

const DISTRICTS = requestedPageService.onGetDistricts();
const ASSISTANCE_CATEGORIES = requestedPageService.onGetCategories();
const EMPTY_CATEGORY_DETAILS = requestedPageService.onGetEmptyCategoryDetails();

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

  const selectedDistrict = requestedPageService.onGetDistrictById(
    form.district
  );

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onUpdateField<K extends keyof RequestFormData>(
    field: K,
    value: RequestFormData[K]
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function onNextStep() {
    if (step < TOTAL_STEPS - 1) {
      setStep((previous) => previous + 1);
    }
  }

  function onPreviousStep() {
    if (step > 0) {
      setStep((previous) => previous - 1);
    }
  }

  function onToggleCategory(categoryId: AssistanceCategoryId) {
    setForm((previous) => {
      const exists = previous.categories.includes(categoryId);
      if (exists) {
        return {
          ...previous,
          categories: previous.categories.filter((id) => id !== categoryId),
          categoryDetails: {
            ...previous.categoryDetails,
            [categoryId]: [],
          },
        };
      }
      return { ...previous, categories: [...previous.categories, categoryId] };
    });
  }

  function onUpdateCategoryDetail(
    categoryId: AssistanceCategoryId,
    option: string
  ) {
    setForm((previous) => {
      const currentOptions = previous.categoryDetails[categoryId] || [];
      const exists = currentOptions.includes(option);
      const updatedOptions = exists
        ? currentOptions.filter((value) => value !== option)
        : [...currentOptions, option];

      let categories = previous.categories;
      const isInCategories = categories.includes(categoryId);

      if (updatedOptions.length && !isInCategories) {
        categories = [...categories, categoryId];
      } else if (!updatedOptions.length && isInCategories) {
        categories = categories.filter((id) => id !== categoryId);
      }

      return {
        ...previous,
        categories,
        categoryDetails: {
          ...previous.categoryDetails,
          [categoryId]: updatedOptions,
        },
      };
    });
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setForm((previous) => ({
      ...previous,
      attachments: [...previous.attachments, ...files],
    }));
  }

  function onSubmitRequest() {
    setIsSubmitted(true);
  }

  function onRenderProgressDots() {
    const dots = [];
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
    return <div className="request-progress">{dots}</div>;
  }

  function onToggleSummarySection(id: SummarySectionId) {
    setOpenSections((previous) => ({ ...previous, [id]: !previous[id] }));
  }

  if (isSubmitted) {
    return (
      <div
        className="user-request-page flex column"
        dir={isHebrew ? "rtl" : "ltr"}
      >
        <header className="user-request-header flex">
          <div className="user-request-header__side" />
          <h1 className="user-request-header__title">טופס בקשת סיוע</h1>
          <div className="user-request-header__side">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onToggleLanguage}
            >
              {isHebrew
                ? t("languageSwitcher.english")
                : t("languageSwitcher.hebrew")}
            </Button>
          </div>
        </header>

        <main className="request-step-main">
          <section className="request-success-card">
            <h2 className="request-step__title">הבקשה נשלחה בהצלחה!</h2>
            <p className="request-success-text">
              בקשתך התקבלה במטה החמ&quot;ל הארצי. ממש בקרוב אחד מנציגינו יצור
              איתך קשר ויעביר את הבקשה הלאה.
            </p>
            <p className="request-success-text request-success-text--muted">
              תודה על פנייתכם, ניצור אתכם קשר בהקדם.
            </p>

            <div className="request-success-actions flex center">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/user/dashboard")}
              >
                חזרה לדף הבית
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
        <div className="user-request-header__side" />
        <h1 className="user-request-header__title">טופס בקשת סיוע</h1>
        <div className="user-request-header__side">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onToggleLanguage}
          >
            {isHebrew
              ? t("languageSwitcher.english")
              : t("languageSwitcher.hebrew")}
          </Button>
        </div>
      </header>

      <main className="request-step-main">
        {step === 0 && (
          <section className="request-step">
            <h2 className="request-step__title">מי צריך עזרה?</h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-field">
                <label className="request-label">
                  שם מקבל הסיוע{" "}
                  <span className="request-label__required">*</span>
                </label>
                <input
                  className="request-input"
                  type="text"
                  value={form.recipientName}
                  onChange={(event) =>
                    onUpdateField("recipientName", event.target.value)
                  }
                  placeholder="שם מלא"
                  required
                />
              </div>

              <div className="request-field">
                <label className="request-label">
                  מספר טלפון <span className="request-label__required">*</span>
                </label>
                <input
                  className="request-input request-input--phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.recipientPhone}
                  onChange={(event) => {
                    const digitsOnly = event.target.value.replace(/\D/g, "");
                    onUpdateField("recipientPhone", digitsOnly);
                  }}
                  placeholder="מספר טלפון"
                  required
                />
              </div>

              <div className="request-field">
                <label className="request-label">
                  כותרת הבקשה <span className="request-label__required">*</span>
                </label>
                <input
                  className="request-input"
                  type="text"
                  value={form.requestTitle}
                  onChange={(event) =>
                    onUpdateField("requestTitle", event.target.value)
                  }
                  placeholder="תיאור קצר של הבקשה"
                  required
                />
              </div>

              <p className="request-hint">
                כתבו שם שמייצג את מי שצריך את העזרה. זה יכול להיות שם של אדם אחד
                או קבוצה. מספר הטלפון צריך להיות של מישהו שנמצא עם מקבלי הסיוע
                ויכול לענות לשיחות או למתנדב בשטח.
              </p>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/user/dashboard")}
                >
                  חזרה לדף הבית
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  השלב הבא →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 1 && (
          <section className="request-step">
            <h2 className="request-step__title">לאיפה להגיע?</h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-field request-field--half">
                <label className="request-label">
                  מחוז <span className="request-label__required">*</span>
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
                  <option value="">בחר מחוז</option>
                  {DISTRICTS.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="request-field request-field--half">
                <label className="request-label">
                  עיר <span className="request-label__required">*</span>
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
                    {selectedDistrict ? "בחר עיר" : "בחר קודם מחוז"}
                  </option>
                  {requestedPageService
                    .onGetCitiesByDistrict(form.district)
                    .map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="request-field">
                <label className="request-label">רחוב</label>
                <input
                  className="request-input"
                  type="text"
                  value={form.street}
                  onChange={(event) =>
                    onUpdateField("street", event.target.value)
                  }
                  placeholder="שם רחוב (אופציונלי)"
                />
              </div>

              <p className="request-hint">
                אנחנו עובדים עם מחוזות פיקוד העורף. מיקום מדויק מאפשר לנו לשייך
                את הבקשה למתל&quot;ק הקרוב ביותר.
              </p>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onPreviousStep}
                >
                  ← השלב הקודם
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  השלב הבא →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 2 && (
          <section className="request-step">
            <h2 className="request-step__title">איזה סוג סיוע נדרש?</h2>

            <div className="request-step__actions flex">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setForm((previous) => ({
                    ...previous,
                    categories: [],
                    categoryDetails: { ...EMPTY_CATEGORY_DETAILS },
                  }))
                }
              >
                אפס בחירה
              </Button>
            </div>

            <div className="request-categories grid">
              {ASSISTANCE_CATEGORIES.map((category) => {
                const isActive = form.categories.includes(category.id);
                const selectedOptions = form.categoryDetails[category.id] || [];
                return (
                  <div
                    key={category.id}
                    className="request-category flex column"
                  >
                    <CategoryCard
                      category={category}
                      isActive={isActive}
                      onToggle={onToggleCategory}
                    />
                    {category.subOptions && (
                      <div className="request-category__options flex">
                        {category.subOptions.map((option) => {
                          const isSelected = selectedOptions.includes(option);
                          const optionClassName =
                            "request-category__option" +
                            (isSelected
                              ? " request-category__option--active"
                              : "");
                          return (
                            <button
                              key={option}
                              type="button"
                              className={optionClassName}
                              onClick={() =>
                                onUpdateCategoryDetail(category.id, option)
                              }
                            >
                              {option}
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
                ← השלב הקודם
              </Button>

              {onRenderProgressDots()}

              <Button type="button" variant="primary" onClick={onNextStep}>
                השלב הבא →
              </Button>
            </footer>
          </section>
        )}

        {step === 3 && (
          <section className="request-step">
            <h2 className="request-step__title">כמה פרטים אחרונים...</h2>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-toggle-group">
                <span className="request-toggle-group__label">נדרש שינוע?</span>
                <div className="request-toggle-group__buttons flex">
                  <Button
                    type="button"
                    variant={
                      form.needsTransport === false ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsTransport", false)}
                  >
                    לא, אין צורך
                  </Button>
                  <Button
                    type="button"
                    variant={
                      form.needsTransport === true ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsTransport", true)}
                  >
                    כן, נדרש שינוע
                  </Button>
                </div>
              </div>

              <div className="request-toggle-group">
                <span className="request-toggle-group__label">
                  דרושים מתנדבים?
                </span>
                <div className="request-toggle-group__buttons flex">
                  <Button
                    type="button"
                    variant={
                      form.needsVolunteers === false ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsVolunteers", false)}
                  >
                    לא, אין צורך
                  </Button>
                  <Button
                    type="button"
                    variant={
                      form.needsVolunteers === true ? "primary" : "secondary"
                    }
                    onClick={() => onUpdateField("needsVolunteers", true)}
                  >
                    כן, דרושים מתנדבים
                  </Button>
                </div>
              </div>

              <div className="request-upload">
                <p className="request-upload__label">
                  העלאת קבצים/תמונות לוגוטייפ
                </p>
                <label className="request-upload__dropzone flex center">
                  <span className="request-upload__hint">
                    העלאת קבצים/תמונות/לוגוטייפ
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={onFilesSelected}
                    hidden
                  />
                </label>

                {form.attachments.length > 0 && (
                  <ul className="request-upload__list">
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
                  ← השלב הקודם
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  השלב הבא →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 4 && (
          <section className="request-step">
            <h2 className="request-step__title">אישור פרטים</h2>
            <h3 className="request-step__subtitle">תיאור פרטים חשובים</h3>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                onNextStep();
              }}
              className="request-form"
            >
              <div className="request-field">
                <label className="request-label">כותרת הבקשה</label>
                <input
                  className="request-input"
                  type="text"
                  value={form.detailsTitle || form.requestTitle}
                  onChange={(event) =>
                    onUpdateField("detailsTitle", event.target.value)
                  }
                  placeholder={form.requestTitle || "כותרת הבקשה"}
                />
              </div>

              <div className="request-field">
                <label className="request-label">תיאור</label>
                <textarea
                  className="request-textarea"
                  value={form.detailsDescription}
                  onChange={(event) =>
                    onUpdateField("detailsDescription", event.target.value)
                  }
                  placeholder="פה זה המקום לפרט..."
                  rows={5}
                />
              </div>

              <p className="request-hint">
                ככל שנדע יותר על הבקשה במדויק, כך יתקצר זמן הטיפול בה.
              </p>

              <footer className="request-step-footer flex">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onPreviousStep}
                >
                  ← השלב הקודם
                </Button>

                {onRenderProgressDots()}

                <Button type="submit" variant="primary">
                  השלב הבא →
                </Button>
              </footer>
            </form>
          </section>
        )}

        {step === 5 && (
          <section className="request-step">
            <h2 className="request-step__title">נא לוודא שכל הפרטים נכונים</h2>
            <h3 className="request-step__subtitle">סיכום הבקשה</h3>

            <div className="request-summary__meta">
              <span>
                {new Date().toLocaleTimeString("he-IL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                | {new Date().toLocaleDateString("he-IL")}
              </span>
            </div>

            <div className="request-summary__headline">
              <div className="request-summary__headline-main flex">
                <span className="request-summary__title-text">
                  {form.requestTitle || "כותרת הבקשה"}
                </span>
                <span className="request-summary__heart">💚</span>
              </div>

              <div className="request-summary__chips flex">
                {selectedDistrict && (
                  <span className="request-chip">{selectedDistrict.name}</span>
                )}
                {form.city && <span className="request-chip">{form.city}</span>}
                {form.categories.length > 0 && (
                  <span className="request-chip">
                    {
                      ASSISTANCE_CATEGORIES.find(
                        (category) => category.id === form.categories[0]
                      )?.label
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="request-summary-accordion">
              <SummarySection
                id="request"
                title="פרטי הבקשה"
                isOpen={openSections.request}
                onToggle={onToggleSummarySection}
              >
                <p>
                  <strong>סוג סיוע:</strong>{" "}
                  {form.categories.length
                    ? form.categories
                        .map((categoryId) => {
                          const category =
                            requestedPageService.onGetCategoryById(categoryId);
                          const baseLabel = category?.label ?? categoryId;
                          const details = form.categoryDetails[categoryId];
                          const suffix =
                            details && details.length
                              ? ` – ${details.join(", ")}`
                              : "";
                          return `${baseLabel}${suffix}`;
                        })
                        .join(" | ")
                    : "לא נבחר"}
                </p>
                {form.detailsDescription && <p>{form.detailsDescription}</p>}
              </SummarySection>

              <SummarySection
                id="requester"
                title="פרטי מבקש הסיוע"
                isOpen={openSections.requester}
                onToggle={onToggleSummarySection}
              >
                <p>
                  {form.recipientName || "שם לא הוזן"} ·{" "}
                  {form.recipientPhone || "טלפון לא הוזן"}
                </p>
              </SummarySection>

              <SummarySection
                id="location"
                title="פרטי מיקום"
                isOpen={openSections.location}
                onToggle={onToggleSummarySection}
              >
                <p>
                  {selectedDistrict?.name || "מחוז לא נבחר"},{" "}
                  {form.city || "עיר לא נבחרה"}
                  {form.street && `, ${form.street}`}
                </p>
              </SummarySection>

              <SummarySection
                id="attachments"
                title="קבצים מצורפים"
                isOpen={openSections.attachments}
                onToggle={onToggleSummarySection}
              >
                {form.attachments.length ? (
                  <ul>
                    {form.attachments.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>לא צורפו קבצים</p>
                )}
              </SummarySection>

              <SummarySection
                id="tasks"
                title="משימות"
                isOpen={openSections.tasks}
                onToggle={onToggleSummarySection}
              >
                <p>משימת ברירת מחדל: ממתין לשיוך במתל&quot;ק.</p>
              </SummarySection>
            </div>

            <footer className="request-step-footer flex">
              <Button
                type="button"
                variant="secondary"
                onClick={onPreviousStep}
              >
                ← השלב הקודם
              </Button>

              {onRenderProgressDots()}

              <Button type="button" variant="primary" onClick={onSubmitRequest}>
                ✓ שמירה ושליחה
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
  category: AssistanceCategory;
  isActive: boolean;
  onToggle: (id: AssistanceCategoryId) => void;
};

function CategoryCard({ category, isActive, onToggle }: CategoryCardProps) {
  const className =
    "request-category-card" +
    (isActive ? " request-category-card--active" : "");

  return (
    <button
      type="button"
      className={className}
      onClick={() => onToggle(category.id)}
    >
      <div className="request-category-card__title">{category.label}</div>
      <div className="request-category-card__subtitle">
        {category.englishLabel}
      </div>
    </button>
  );
}
