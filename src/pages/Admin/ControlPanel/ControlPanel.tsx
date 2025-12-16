import "./ControlPanel.scss";

import Button from "@components/button/button";
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
    <div className="grid control-page" dir={isHebrew ? "rtl" : "ltr"}>
      <header className="grid control-header cols-3 items-center gap-3">
        <div className="grid justify-start">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogoutClick}
          >
            יציאה
          </Button>
        </div>

        <h1 className="control-header-title text-center">System settings</h1>

        <div className="grid justify-end">
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
        <section className="grid control-card gap-2">
          <h2 className="control-card-title">General settings</h2>
          <p className="control-card-subtitle">
            Here you’ll configure system-level options (roles, permissions,
            organizations, etc). For now this is just a placeholder.
          </p>
        </section>
      </main>
    </div>
  );
}
