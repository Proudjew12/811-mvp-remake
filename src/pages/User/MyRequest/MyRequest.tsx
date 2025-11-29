import "../RequestPage/RequestPage.scss";

import Button from "../../../components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  requestedPageService,
  UserRequestSnapshot,
  AssistanceCategoryId,
  City,
} from "../../../services/RequestedPage/requestedPage.service";

export default function MyRequestPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isHebrew = i18n.language.startsWith("he");

  const [request, setRequest] = useState<UserRequestSnapshot | null>(() =>
    requestedPageService.loadRequestSnapshot()
  );

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onClearRequest() {
    requestedPageService.clearRequestSnapshot();
    setRequest(null);
  }

  const locale = isHebrew ? "he-IL" : "en-GB";

  if (!request) {
    return (
      <div
        className="user-request-page flex column"
        dir={isHebrew ? "rtl" : "ltr"}
      >
        <header className="user-request-header flex">
          <h1 className="user-request-header__title">{t("myRequest.title")}</h1>
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
          <section className="request-step">
            <h2 className="request-step__title">{t("myRequest.emptyTitle")}</h2>
            <p className="request-success-text--muted">
              {t("myRequest.emptyBody")}
            </p>
            <div className="request-success-actions flex center">
              <Button
                type="button"
                variant="primary"
                onClick={() => navigate("/user/request")}
              >
                {t("myRequest.createNew")}
              </Button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const district = requestedPageService.getDistrictById(request.district);
  const city: City | undefined = district?.cities.find(
    (c) => c.id === request.city
  );

  const categories = request.categories.map((id: AssistanceCategoryId) =>
    requestedPageService.getCategoryById(id)
  );

  return (
    <div
      className="user-request-page flex column"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      <header className="user-request-header flex">
        <h1 className="user-request-header__title">{t("myRequest.title")}</h1>
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
        <section className="request-step">
          <div className="request-summary__meta">
            <span>
              {new Date(request.savedAt).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              | {new Date(request.savedAt).toLocaleDateString(locale)}
            </span>
          </div>

          <div className="request-summary__headline">
            <div className="request-summary__headline-main flex">
              <span className="request-summary__title-text">
                {request.requestTitle ||
                  t("userRequest.step5.requestTitleLabel")}
              </span>
              <span className="request-summary__heart">💚</span>
            </div>

            <div className="request-summary__chips flex">
              {district && (
                <span className="request-chip">
                  {isHebrew ? district.nameHe : district.nameEn}
                </span>
              )}
              {city && (
                <span className="request-chip">
                  {isHebrew ? city.nameHe : city.nameEn}
                </span>
              )}
              {categories[0] && (
                <span className="request-chip">
                  {isHebrew ? categories[0]!.labelHe : categories[0]!.labelEn}
                </span>
              )}
            </div>
          </div>

          <div className="request-summary-accordion">
            <div className="request-summary-section">
              <div className="request-summary-section__header flex">
                <span>{t("userRequest.step6.sectionRequest")}</span>
              </div>
              <div className="request-summary-section__body">
                <p>
                  <strong>{t("userRequest.step6.assistanceTypeLabel")}</strong>{" "}
                  {request.categories.length
                    ? request.categories
                        .map((categoryId) => {
                          const category =
                            requestedPageService.getCategoryById(categoryId);
                          if (!category) return categoryId;
                          const baseLabel = isHebrew
                            ? category.labelHe
                            : category.labelEn;
                          const detailIds =
                            request.categoryDetails[categoryId] || [];
                          const optionLabels =
                            category.options
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
                {request.detailsDescription && (
                  <p>{request.detailsDescription}</p>
                )}
              </div>
            </div>

            <div className="request-summary-section">
              <div className="request-summary-section__header flex">
                <span>{t("userRequest.step6.sectionRequester")}</span>
              </div>
              <div className="request-summary-section__body">
                <p>
                  {request.recipientName || t("userRequest.step6.noName")} ·{" "}
                  {request.recipientPhone || t("userRequest.step6.noPhone")}
                </p>
              </div>
            </div>

            <div className="request-summary-section">
              <div className="request-summary-section__header flex">
                <span>{t("userRequest.step6.sectionLocation")}</span>
              </div>
              <div className="request-summary-section__body">
                <p>
                  {(district &&
                    (isHebrew ? district.nameHe : district.nameEn)) ||
                    t("userRequest.step6.noDistrict")}
                  ,{" "}
                  {city
                    ? isHebrew
                      ? city.nameHe
                      : city.nameEn
                    : t("userRequest.step6.noCity")}
                  {request.street && `, ${request.street}`}
                </p>
              </div>
            </div>

            <div className="request-summary-section">
              <div className="request-summary-section__header flex">
                <span>{t("userRequest.step6.sectionAttachments")}</span>
              </div>
              <div className="request-summary-section__body">
                {request.attachments.length ? (
                  <ul className="clean-list">
                    {request.attachments.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{t("userRequest.step6.noFiles")}</p>
                )}
              </div>
            </div>
          </div>

          <footer className="request-step-footer flex">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/user/dashboard")}
            >
              {t("myRequest.backToDashboard")}
            </Button>

            <div />

            <Button type="button" variant="secondary" onClick={onClearRequest}>
              {t("myRequest.clear")}
            </Button>
          </footer>
        </section>
      </main>
    </div>
  );
}
