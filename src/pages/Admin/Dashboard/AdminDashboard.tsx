import "./AdminDashboard.scss";
import Button from "@components/button/button";
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
    <div className="grid dashboard-page" dir={isHebrew ? "rtl" : "ltr"}>
      <header className="grid dashboard-header cols-3 items-center gap-3">
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

        <h1 className="dashboard-header-title text-center">
          {t("dashboard.title")}
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

      <main className="dashboard-main">
        <div className="grid dashboard-layout gap-3">
          <section className="dashboard-card dashboard-card--overview">
            <header className="grid dashboard-card-header gap-1">
              <h2 className="dashboard-card-title">
                {t("dashboard.overview.title")}
              </h2>
              <p className="dashboard-card-subtitle">
                {t("dashboard.overview.subtitle")}
              </p>
            </header>

            <div className="grid dashboard-stats cols-3 gap-3">
              <div className="grid dashboard-stat gap-1">
                <span className="dashboard-stat-label">
                  {t("dashboard.stats.openRequests.label")}
                </span>
                <span className="dashboard-stat-value">12</span>
                <span className="dashboard-stat-hint">
                  {t("dashboard.stats.openRequests.hint")}
                </span>
              </div>

              <div className="grid dashboard-stat gap-1">
                <span className="dashboard-stat-label">
                  {t("dashboard.stats.todayRequests.label")}
                </span>
                <span className="dashboard-stat-value">5</span>
                <span className="dashboard-stat-hint">
                  {t("dashboard.stats.todayRequests.hint")}
                </span>
              </div>

              <div className="grid dashboard-stat gap-1">
                <span className="dashboard-stat-label">
                  {t("dashboard.stats.handledThisWeek.label")}
                </span>
                <span className="dashboard-stat-value">27</span>
                <span className="dashboard-stat-hint">
                  {t("dashboard.stats.handledThisWeek.hint")}
                </span>
              </div>
            </div>

            <div className="grid dashboard-actions cols-2 gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onGoToControlPanel}
              >
                System settings
              </Button>

              <Button type="button" variant="primary" onClick={onGoToRequests}>
                {t("dashboard.actions.viewAllRequests")}
              </Button>
            </div>
          </section>

          <aside className="dashboard-card dashboard-card--sidebar">
            <header className="grid dashboard-card-header gap-1">
              <h2 className="dashboard-card-title">
                {t("dashboard.quickActions.title")}
              </h2>
            </header>

            <ul className="clean-list grid dashboard-quick-list gap-2">
              <li className="grid dashboard-quick-item flow-col items-center gap-2">
                <span className="dashboard-quick-bullet" aria-hidden />
                <span className="dashboard-quick-text">
                  {t("dashboard.quickActions.itemApprovePending")}
                </span>
              </li>

              <li className="grid dashboard-quick-item flow-col items-center gap-2">
                <span className="dashboard-quick-bullet" aria-hidden />
                <span className="dashboard-quick-text">
                  {t("dashboard.quickActions.itemRecent")}
                </span>
              </li>

              <li className="grid dashboard-quick-item flow-col items-center gap-2">
                <span className="dashboard-quick-bullet" aria-hidden />
                <span className="dashboard-quick-text">
                  {t("dashboard.quickActions.itemUrgent")}
                </span>
              </li>
            </ul>
          </aside>

          <section className="dashboard-card dashboard-card--activity">
            <header className="grid dashboard-card-header gap-1">
              <h2 className="dashboard-card-title">
                {t("dashboard.recentActivity.title")}
              </h2>
            </header>

            <ul className="clean-list grid dashboard-activity-list gap-2">
              <li className="grid dashboard-activity gap-1">
                <p className="dashboard-activity-main">
                  {t("dashboard.recentActivity.item1.main")}
                </p>
                <p className="dashboard-activity-meta">
                  {t("dashboard.recentActivity.item1.meta")}
                </p>
              </li>

              <li className="grid dashboard-activity gap-1">
                <p className="dashboard-activity-main">
                  {t("dashboard.recentActivity.item2.main")}
                </p>
                <p className="dashboard-activity-meta">
                  {t("dashboard.recentActivity.item2.meta")}
                </p>
              </li>

              <li className="grid dashboard-activity gap-1">
                <p className="dashboard-activity-main">
                  {t("dashboard.recentActivity.item3.main")}
                </p>
                <p className="dashboard-activity-meta">
                  {t("dashboard.recentActivity.item3.meta")}
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
