import "./AdminDashboard.scss";
import Button from "../../../components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isHebrew = i18n.language.startsWith("he");

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onLogoutClick() {
    navigate("/", { replace: true });
  }

  function onGoToControlPanel() {
    navigate("/admin/control-panel");
  }

  function onGoToRequests() {
    navigate("/admin/requests");
  }

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <header className="dashboard-header flex justify-between align-center">
        <div className="dashboard-header__side dashboard-header__side--left flex align-center">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogoutClick}
          >
            {t("common.logout")}
          </Button>
        </div>

        <h1 className="dashboard-header__title">{t("dashboard.title")}</h1>

        <div className="dashboard-header__side dashboard-header__side--right flex align-center">
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

      {/* MAIN */}
      <main className="dashboard-layout grid">
        {/* OVERVIEW CARD */}
        <section className="dashboard-card dashboard-card--overview">
          <header className="dashboard-card__header">
            <h2 className="dashboard-card__title">
              {t("dashboard.overview.title")}
            </h2>
            <p className="dashboard-card__subtitle">
              {t("dashboard.overview.subtitle")}
            </p>
          </header>

          <div className="dashboard-stats grid">
            <div className="dashboard-stat">
              <span className="dashboard-stat__label">
                {t("dashboard.stats.openRequests.label")}
              </span>
              <span className="dashboard-stat__value">12</span>
              <span className="dashboard-stat__hint">
                {t("dashboard.stats.openRequests.hint")}
              </span>
            </div>

            <div className="dashboard-stat">
              <span className="dashboard-stat__label">
                {t("dashboard.stats.todayRequests.label")}
              </span>
              <span className="dashboard-stat__value">5</span>
              <span className="dashboard-stat__hint">
                {t("dashboard.stats.todayRequests.hint")}
              </span>
            </div>

            <div className="dashboard-stat">
              <span className="dashboard-stat__label">
                {t("dashboard.stats.handledThisWeek.label")}
              </span>
              <span className="dashboard-stat__value">27</span>
              <span className="dashboard-stat__hint">
                {t("dashboard.stats.handledThisWeek.hint")}
              </span>
            </div>
          </div>

          <div className="dashboard-actions grid">
            <Button
              type="button"
              variant="secondary"
              onClick={onGoToControlPanel}
            >
              {/* You can later move this into i18n */}
              System settings
            </Button>

            <Button type="button" variant="primary" onClick={onGoToRequests}>
              {t("dashboard.actions.viewAllRequests")}
            </Button>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <aside className="dashboard-card dashboard-card--sidebar">
          <header className="dashboard-card__header">
            <h2 className="dashboard-card__title">
              {t("dashboard.quickActions.title")}
            </h2>
          </header>

          <ul className="dashboard-quick-list grid">
            <li className="dashboard-quick-item flex align-center">
              <span className="dashboard-quick-item__bullet" />
              <span className="dashboard-quick-item__text">
                {t("dashboard.quickActions.itemApprovePending")}
              </span>
            </li>
            <li className="dashboard-quick-item flex align-center">
              <span className="dashboard-quick-item__bullet" />
              <span className="dashboard-quick-item__text">
                {t("dashboard.quickActions.itemRecent")}
              </span>
            </li>
            <li className="dashboard-quick-item flex align-center">
              <span className="dashboard-quick-item__bullet" />
              <span className="dashboard-quick-item__text">
                {t("dashboard.quickActions.itemUrgent")}
              </span>
            </li>
          </ul>
        </aside>

        {/* RECENT ACTIVITY */}
        <section className="dashboard-card dashboard-card--activity">
          <header className="dashboard-card__header dashboard-card__header--row flex justify-between align-center">
            <h2 className="dashboard-card__title">
              {t("dashboard.recentActivity.title")}
            </h2>
          </header>

          <ul className="dashboard-activity-list grid">
            <li className="dashboard-activity">
              <p className="dashboard-activity__main">
                {t("dashboard.recentActivity.item1.main")}
              </p>
              <p className="dashboard-activity__meta">
                {t("dashboard.recentActivity.item1.meta")}
              </p>
            </li>
            <li className="dashboard-activity">
              <p className="dashboard-activity__main">
                {t("dashboard.recentActivity.item2.main")}
              </p>
              <p className="dashboard-activity__meta">
                {t("dashboard.recentActivity.item2.meta")}
              </p>
            </li>
            <li className="dashboard-activity">
              <p className="dashboard-activity__main">
                {t("dashboard.recentActivity.item3.main")}
              </p>
              <p className="dashboard-activity__meta">
                {t("dashboard.recentActivity.item3.meta")}
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
