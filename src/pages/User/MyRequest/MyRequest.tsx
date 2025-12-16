import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./MyRequest.scss";

import Button from "@components/button/button";
import {
  requestedPageService,
  UserRequestSnapshot,
  AssistanceCategoryId,
  City,
} from "@services/RequestPage/UserRequestPage.service";

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
      <div className="grid requestPage" dir={isHebrew ? "rtl" : "ltr"}>
        <header className="grid requestHeader items-center">
          <h1 className="requestHeaderTitle">{t("myRequest.title")}</h1>
          <div className="grid requestHeaderActions justify-end">
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

        <main className="requestMain">
          <section className="grid requestCard gap-3">
            <h2 className="requestTitle">{t("myRequest.emptyTitle")}</h2>
            <p className="mutedText">{t("myRequest.emptyBody")}</p>

            <div className="grid place-center">
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
    <div className="grid requestPage" dir={isHebrew ? "rtl" : "ltr"}>
      <header className="grid requestHeader items-center">
        <h1 className="requestHeaderTitle">{t("myRequest.title")}</h1>
        <div className="grid requestHeaderActions justify-end">
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

      <main className="requestMain">
        <section className="grid requestCard gap-3">
          <div className="mutedText">
            {new Date(request.savedAt).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            | {new Date(request.savedAt).toLocaleDateString(locale)}
          </div>

          <div className="grid requestHeadline gap-2">
            <div className="grid requestHeadlineMain">
              <span className="requestHeadlineTitle">
                {request.requestTitle ||
                  t("userRequest.step5.requestTitleLabel")}
              </span>
              <span className="requestHeart" aria-hidden>
                💚
              </span>
            </div>

            <div className="grid requestChips gap-2">
              {district && (
                <span className="requestChip">
                  {isHebrew ? district.nameHe : district.nameEn}
                </span>
              )}
              {city && (
                <span className="requestChip">
                  {isHebrew ? city.nameHe : city.nameEn}
                </span>
              )}
              {categories[0] && (
                <span className="requestChip">
                  {isHebrew ? categories[0]!.labelHe : categories[0]!.labelEn}
                </span>
              )}
            </div>
          </div>

          <div className="grid requestAccordion gap-2">
            <div className="requestSection">
              <div className="requestSectionHeader">
                {t("userRequest.step6.sectionRequest")}
              </div>
              <div className="requestSectionBody">
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

                {request.needsTransport != null && (
                  <p>
                    <strong>{t("userRequest.step4.transportQuestion")}</strong>{" "}
                    {request.needsTransport
                      ? t("userRequest.step4.transportYes")
                      : t("userRequest.step4.transportNo")}
                  </p>
                )}

                {request.needsVolunteers != null && (
                  <p>
                    <strong>{t("userRequest.step4.volunteersQuestion")}</strong>{" "}
                    {request.needsVolunteers
                      ? t("userRequest.step4.volunteersYes")
                      : t("userRequest.step4.volunteersNo")}
                  </p>
                )}
              </div>
            </div>

            <div className="requestSection">
              <div className="requestSectionHeader">
                {t("userRequest.step6.sectionRequester")}
              </div>
              <div className="requestSectionBody">
                <p>
                  {request.recipientName || t("userRequest.step6.noName")} ·{" "}
                  {request.recipientPhone || t("userRequest.step6.noPhone")}
                </p>
              </div>
            </div>

            <div className="requestSection">
              <div className="requestSectionHeader">
                {t("userRequest.step6.sectionLocation")}
              </div>
              <div className="requestSectionBody">
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

            <div className="requestSection">
              <div className="requestSectionHeader">
                {t("userRequest.step6.sectionAttachments")}
              </div>
              <div className="requestSectionBody">
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

          <footer className="grid requestFooter cols-3 items-center gap-2">
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
