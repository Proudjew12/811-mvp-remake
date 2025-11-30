import "./UserRequestPage.scss";

import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "../../../components/button/button";
import {
  requestedPageService,
  DistrictId,
  AssistanceCategoryId,
  CategoryDetailsMap,
  City,
  UserRequestSnapshot,
} from "../../../services/RequestPage/UserRequestPage.service";

import {
  appendAttachments,
  extractAttachmentNames,
  getLocaleFromIsHebrew,
  sanitizePhoneInput,
  toggleCategory,
  toggleCategoryDetail,
} from "../../../utils/User/RequestPage/RequestPageFunctions";

import { RequestProgressDots } from "../../../components/RequestPage/RequestProgressDots";
import { Step1BasicInfo } from "./steps/Step1BasicInfo";
import { Step2Location } from "./steps/Step2Location";
import { Step3Categories } from "./steps/Step3Categories";
import { Step4Extras } from "./steps/Step4Extras";
import { Step5Details } from "./steps/Step5Details";
import { Step6Summary } from "./steps/Step6Summary";

export type SummarySectionId =
  | "request"
  | "requester"
  | "location"
  | "attachments"
  | "tasks";

export type RequestFormData = {
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

  function onToggleCategoryHandler(categoryId: AssistanceCategoryId) {
    setForm((prev) => {
      const { categories, categoryDetails } = toggleCategory(
        prev.categories,
        prev.categoryDetails,
        categoryId
      );
      return { ...prev, categories, categoryDetails };
    });
  }

  function onUpdateCategoryDetailHandler(
    categoryId: AssistanceCategoryId,
    optionId: string
  ) {
    setForm((prev) => {
      const { categories, categoryDetails } = toggleCategoryDetail(
        prev.categories,
        prev.categoryDetails,
        categoryId,
        optionId
      );
      return { ...prev, categories, categoryDetails };
    });
  }

  function onFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setForm((prev) => ({
      ...prev,
      attachments: appendAttachments(prev.attachments, files),
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
      attachments: extractAttachmentNames(form.attachments),
      detailsTitle: form.detailsTitle,
      detailsDescription: form.detailsDescription,
      savedAt: new Date().toISOString(),
    };

    requestedPageService.saveRequestSnapshot(snapshot);
    setIsSubmitted(true);
  }

  function onToggleSummarySection(id: SummarySectionId) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const locale = getLocaleFromIsHebrew(isHebrew);

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
          <Step1BasicInfo
            t={t}
            isHebrew={isHebrew}
            form={form}
            onUpdateField={onUpdateField}
            onNextStep={onNextStep}
            onNavigateHome={() => navigate("/user/dashboard")}
            renderProgressDots={() => (
              <RequestProgressDots
                currentStep={step}
                totalSteps={TOTAL_STEPS}
              />
            )}
            sanitizePhoneInput={sanitizePhoneInput}
          />
        )}

        {step === 1 && (
          <Step2Location
            t={t}
            isHebrew={isHebrew}
            form={form}
            onUpdateField={onUpdateField}
            onNextStep={onNextStep}
            onPreviousStep={onPreviousStep}
            districts={DISTRICTS}
            selectedDistrict={selectedDistrict}
            getCitiesByDistrict={requestedPageService.getCitiesByDistrict}
            renderProgressDots={() => (
              <RequestProgressDots
                currentStep={step}
                totalSteps={TOTAL_STEPS}
              />
            )}
          />
        )}

        {step === 2 && (
          <Step3Categories
            t={t}
            isHebrew={isHebrew}
            form={form}
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            onToggleCategory={onToggleCategoryHandler}
            onUpdateCategoryDetail={onUpdateCategoryDetailHandler}
            assistanceCategories={ASSISTANCE_CATEGORIES}
            emptyCategoryDetails={EMPTY_CATEGORY_DETAILS}
            setForm={setForm}
            renderProgressDots={() => (
              <RequestProgressDots
                currentStep={step}
                totalSteps={TOTAL_STEPS}
              />
            )}
          />
        )}

        {step === 3 && (
          <Step4Extras
            t={t}
            form={form}
            onUpdateField={onUpdateField}
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            onFilesSelected={onFilesSelected}
            renderProgressDots={() => (
              <RequestProgressDots
                currentStep={step}
                totalSteps={TOTAL_STEPS}
              />
            )}
          />
        )}

        {step === 4 && (
          <Step5Details
            t={t}
            form={form}
            onUpdateField={onUpdateField}
            onPreviousStep={onPreviousStep}
            onNextStep={onNextStep}
            renderProgressDots={() => (
              <RequestProgressDots
                currentStep={step}
                totalSteps={TOTAL_STEPS}
              />
            )}
          />
        )}

        {step === 5 && (
          <Step6Summary
            t={t}
            isHebrew={isHebrew}
            form={form}
            locale={locale}
            selectedDistrict={selectedDistrict}
            selectedCity={selectedCity}
            assistanceCategories={ASSISTANCE_CATEGORIES}
            openSections={openSections}
            onToggleSummarySection={onToggleSummarySection}
            onPreviousStep={onPreviousStep}
            onSubmitRequest={onSubmitRequest}
            renderProgressDots={() => (
              <RequestProgressDots
                currentStep={step}
                totalSteps={TOTAL_STEPS}
              />
            )}
          />
        )}
      </main>
    </div>
  );
}
