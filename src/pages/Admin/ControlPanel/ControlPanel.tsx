import "../Dashboard/AdminDashboard.scss"; // header styles
import "./ControlPanel.scss";

import Button from "../../../components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ControlPanel() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isHebrew = i18n.language.startsWith("he");

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onLogoutClick() {
    navigate("/", { replace: true });
  }

  return (
    <div className="control-page">
      <header className="dashboard-header flex justify-between align-center">
        <div className="dashboard-header__side dashboard-header__side--left flex align-center">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogoutClick}
          >
            יציאה
          </Button>
        </div>

        <h1 className="dashboard-header__title">System settings</h1>

        <div className="dashboard-header__side dashboard-header__side--right flex align-center">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onToggleLanguage}
          >
            {isHebrew ? "English" : "עברית"}
          </Button>
        </div>
      </header>

      <main className="control-main">
        <section className="control-card">
          <h2 className="control-card__title">General settings</h2>
          <p className="control-card__subtitle">
            Here you’ll configure system-level options (roles, permissions,
            organizations, etc). For now this is just a placeholder.
          </p>
        </section>
      </main>
    </div>
  );
}
