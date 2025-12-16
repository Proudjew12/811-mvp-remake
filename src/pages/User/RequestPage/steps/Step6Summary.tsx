import { ReactNode } from "react";
import Button from "@components/button/button";
import { RequestFormData, SummarySectionId } from "../UserRequestPage";
import {
  AssistanceCategory,
  City,
  District,
} from "@services/RequestPage/UserRequestPage.service";
import { SummarySection } from "@components/RequestPage/SummarySection";

type Props = {
  t: (key: string) => string;
  isHebrew: boolean;
  form: RequestFormData;
  locale: string;
  selectedDistrict: District | null;
  selectedCity?: City;
  assistanceCategories: AssistanceCategory[];
  openSections: Record<SummarySectionId, boolean>;
  onToggleSummarySection: (id: SummarySectionId) => void;
  onPreviousStep: () => void;
  onSubmitRequest: () => void;
  renderProgressDots: () => ReactNode;
};

export function Step6Summary({
  t,
  isHebrew,
  form,
  locale,
  selectedDistrict,
  selectedCity,
  assistanceCategories,
  openSections,
  onToggleSummarySection,
  onPreviousStep,
  onSubmitRequest,
  renderProgressDots,
}: Props) {
  const now = new Date();

  const assistanceTypeText = form.categories.length
    ? form.categories
        .map((categoryId) => {
          const category = assistanceCategories.find(
            (c) => c.id === categoryId
          );

          const baseLabel = category
            ? isHebrew
              ? category.labelHe
              : category.labelEn
            : categoryId;

          const detailIds = form.categoryDetails[categoryId] || [];
          const optionLabels =
            category?.options
              ?.filter((opt) => detailIds.includes(opt.id))
              .map((opt) => (isHebrew ? opt.labelHe : opt.labelEn)) ?? [];

          const suffix = optionLabels.length
            ? ` – ${optionLabels.join(", ")}`
            : "";
          return `${baseLabel}${suffix}`;
        })
        .join(" | ")
    : t("userRequest.step6.assistanceTypeNotSelected");

  return (
    <section className="grid request-step">
      <h2 className="request-step-title">{t("userRequest.step6.title")}</h2>
      <h3 className="request-step-subtitle">
        {t("userRequest.step6.subtitle")}
      </h3>

      <div className="summary-meta">
        <span>
          {now.toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          | {now.toLocaleDateString(locale)}
        </span>
      </div>

      <div className="grid summary-headline">
        <div className="grid summary-headline-main">
          <span className="summary-title">
            {form.requestTitle || t("userRequest.step5.requestTitleLabel")}
          </span>
          <span className="summary-heart" aria-hidden>
            💚
          </span>
        </div>

        <div className="grid summary-chips">
          {selectedDistrict && (
            <span className="request-chip">
              {isHebrew ? selectedDistrict.nameHe : selectedDistrict.nameEn}
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
                assistanceCategories.find((c) => c.id === form.categories[0])?.[
                  isHebrew ? "labelHe" : "labelEn"
                ]
              }
            </span>
          )}
        </div>
      </div>

      <div className="grid summary-accordion">
        <SummarySection
          id="request"
          title={t("userRequest.step6.sectionRequest")}
          isOpen={openSections.request}
          onToggle={onToggleSummarySection}
        >
          <p>
            <strong>{t("userRequest.step6.assistanceTypeLabel")}</strong>{" "}
            {assistanceTypeText}
          </p>

          {form.detailsDescription && <p>{form.detailsDescription}</p>}

          {form.needsTransport !== null && (
            <p>
              <strong>{t("userRequest.step4.transportQuestion")}</strong>{" "}
              {form.needsTransport
                ? t("userRequest.step4.transportYes")
                : t("userRequest.step4.transportNo")}
            </p>
          )}

          {form.needsVolunteers !== null && (
            <p>
              <strong>{t("userRequest.step4.volunteersQuestion")}</strong>{" "}
              {form.needsVolunteers
                ? t("userRequest.step4.volunteersYes")
                : t("userRequest.step4.volunteersNo")}
            </p>
          )}
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
              (isHebrew ? selectedDistrict.nameHe : selectedDistrict.nameEn)) ||
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

      <footer className="grid request-footer">
        <Button type="button" variant="secondary" onClick={onPreviousStep}>
          ← {t("footer.previous")}
        </Button>

        <div className="request-footer-center">{renderProgressDots()}</div>

        <Button type="button" variant="primary" onClick={onSubmitRequest}>
          {t("userRequest.submitAndSave")}
        </Button>
      </footer>
    </section>
  );
}
