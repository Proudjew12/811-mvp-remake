import "./HomePage.scss";
import Button from "../../components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const isHebrew = i18n.language.startsWith("he");

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onLogoutClick() {
    navigate("/", { replace: true });
  }

  return (
    <div className="home-page">
      <header className="home-header flex justify-between align-center">
        <div className="home-header__side home-header__side--left flex align-center">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogoutClick}
          >
            {t("common.logout")}
          </Button>
        </div>

        <h1 className="home-header__title">{t("dashboard.title")}</h1>

        <div className="home-header__side home-header__side--right flex justify-end align-center">
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

      <main className="home-layout grid">
        <section className="home-card home-card--overview">
          <header className="home-card__header">
            <h2 className="home-card__title">
              {t("dashboard.overview.title")}
            </h2>
            <p className="home-card__subtitle">
              {t("dashboard.overview.subtitle")}
            </p>
          </header>

          <div className="home-stats grid">
            <div className="home-stat">
              <span className="home-stat__label">
                {t("dashboard.stats.openRequests.label")}
              </span>
              <span className="home-stat__value">12</span>
              <span className="home-stat__hint">
                {t("dashboard.stats.openRequests.hint")}
              </span>
            </div>

            <div className="home-stat">
              <span className="home-stat__label">
                {t("dashboard.stats.todayRequests.label")}
              </span>
              <span className="home-stat__value">5</span>
              <span className="home-stat__hint">
                {t("dashboard.stats.todayRequests.hint")}
              </span>
            </div>

            <div className="home-stat">
              <span className="home-stat__label">
                {t("dashboard.stats.handledThisWeek.label")}
              </span>
              <span className="home-stat__value">27</span>
              <span className="home-stat__hint">
                {t("dashboard.stats.handledThisWeek.hint")}
              </span>
            </div>
          </div>

          <div className="home-actions grid">
            <Button type="button" variant="secondary">
              {t("dashboard.actions.newRequest")}
            </Button>
            <Button type="button" variant="primary">
              {t("dashboard.actions.viewAllRequests")}
            </Button>
          </div>
        </section>

        <aside className="home-card home-card--sidebar">
          <header className="home-card__header">
            <h2 className="home-card__title">
              {t("dashboard.quickActions.title")}
            </h2>
          </header>

          <ul className="home-quick-list grid">
            <li className="home-quick-item flex align-center">
              <span className="home-quick-item__bullet" />
              <span className="home-quick-item__text">
                {t("dashboard.quickActions.itemApprovePending")}
              </span>
            </li>
            <li className="home-quick-item flex align-center">
              <span className="home-quick-item__bullet" />
              <span className="home-quick-item__text">
                {t("dashboard.quickActions.itemRecent")}
              </span>
            </li>
            <li className="home-quick-item flex align-center">
              <span className="home-quick-item__bullet" />
              <span className="home-quick-item__text">
                {t("dashboard.quickActions.itemUrgent")}
              </span>
            </li>
          </ul>
        </aside>

        <section className="home-card home-card--activity">
          <header className="home-card__header home-card__header--row flex justify-between align-center">
            <h2 className="home-card__title">
              {t("dashboard.recentActivity.title")}
            </h2>
          </header>

          <ul className="home-activity-list grid">
            <li className="home-activity">
              <p className="home-activity__main">
                {t("dashboard.recentActivity.item1.main")}
              </p>
              <p className="home-activity__meta">
                {t("dashboard.recentActivity.item1.meta")}
              </p>
            </li>
            <li className="home-activity">
              <p className="home-activity__main">
                {t("dashboard.recentActivity.item2.main")}
              </p>
              <p className="home-activity__meta">
                {t("dashboard.recentActivity.item2.meta")}
              </p>
            </li>
            <li className="home-activity">
              <p className="home-activity__main">
                {t("dashboard.recentActivity.item3.main")}
              </p>
              <p className="home-activity__meta">
                {t("dashboard.recentActivity.item3.meta")}
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
