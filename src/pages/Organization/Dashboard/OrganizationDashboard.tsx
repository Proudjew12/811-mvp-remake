import "./OrganizationDashboard.scss";

import Button from "@components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function OrganizationDashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isHebrew = i18n.language.startsWith("he");

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onLogoutClick() {
    navigate("/", { replace: true });
  }

  function onGoToVolunteers() {
    navigate("/organization/volunteers");
  }

  function onGoToRequests() {
    navigate("/organization/requests");
  }

  return (
    <div className="grid org-page" dir={isHebrew ? "rtl" : "ltr"}>
      <header className="grid org-header items-center">
        <div className="grid justify-start">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogoutClick}
          >
            {t("common.logout")}
          </Button>
        </div>

        <h1 className="org-title text-center">
          {t("dashboard.title")} – Organization
        </h1>

        <div className="grid justify-end">
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

      <main className="org-main">
        <div className="grid org-layout">
          <section className="org-card org-card--overview">
            <header className="grid org-cardHead">
              <h2 className="org-cardTitle">{t("dashboard.overview.title")}</h2>
              <p className="org-cardSubtitle">
                {t("dashboard.overview.subtitle")}
              </p>
            </header>

            <div className="grid org-stats">
              <div className="grid org-stat">
                <span className="org-statLabel">
                  {t("dashboard.stats.openRequests.label")}
                </span>
                <span className="org-statValue">7</span>
                <span className="org-statHint">
                  {t("dashboard.stats.openRequests.hint")}
                </span>
              </div>

              <div className="grid org-stat">
                <span className="org-statLabel">
                  {t("dashboard.stats.todayRequests.label")}
                </span>
                <span className="org-statValue">3</span>
                <span className="org-statHint">
                  {t("dashboard.stats.todayRequests.hint")}
                </span>
              </div>

              <div className="grid org-stat">
                <span className="org-statLabel">
                  {t("dashboard.stats.handledThisWeek.label")}
                </span>
                <span className="org-statValue">15</span>
                <span className="org-statHint">
                  {t("dashboard.stats.handledThisWeek.hint")}
                </span>
              </div>
            </div>

            <div className="grid org-actions">
              <Button type="button" variant="primary" onClick={onGoToRequests}>
                {t("dashboard.actions.viewAllRequests")}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={onGoToVolunteers}
              >
                מתנדבים
              </Button>
            </div>
          </section>

          <aside className="org-card org-card--sidebar">
            <header className="grid org-cardHead">
              <h2 className="org-cardTitle">
                {t("dashboard.quickActions.title")}
              </h2>
            </header>

            <ul className="clean-list grid org-quickList">
              <li className="grid org-quickItem flow-col items-center">
                <span className="org-bullet" aria-hidden />
                <span className="org-quickText">
                  {t("dashboard.quickActions.itemRecent")}
                </span>
              </li>

              <li className="grid org-quickItem flow-col items-center">
                <span className="org-bullet" aria-hidden />
                <span className="org-quickText">
                  {t("dashboard.quickActions.itemUrgent")}
                </span>
              </li>
            </ul>
          </aside>

          <section className="org-card org-card--activity">
            <header className="grid org-cardHead">
              <h2 className="org-cardTitle">
                {t("dashboard.recentActivity.title")}
              </h2>
            </header>

            <ul className="clean-list grid org-activityList">
              <li className="grid org-activityItem">
                <p className="org-activityMain">
                  {t("dashboard.recentActivity.item1.main")}
                </p>
                <p className="org-activityMeta">
                  {t("dashboard.recentActivity.item1.meta")}
                </p>
              </li>

              <li className="grid org-activityItem">
                <p className="org-activityMain">
                  {t("dashboard.recentActivity.item2.main")}
                </p>
                <p className="org-activityMeta">
                  {t("dashboard.recentActivity.item2.meta")}
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
