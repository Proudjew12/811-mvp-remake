import "@pages/Admin/Dashboard/AdminDashboard.scss";
import "./VolunteersPage.scss";

import Button from "@components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Volunteer = {
  id: number;
  name: string;
  role: string;
  area: string;
  availability: string;
};

const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: 1,
    name: "אורן לוי",
    role: "נהג מתנדב",
    area: "מרכז",
    availability: "ערבים באמצע השבוע",
  },
  {
    id: 2,
    name: "שיר כהן",
    role: "חלוקת מזון",
    area: "תל אביב",
    availability: "שישי בבוקר",
  },
  {
    id: 3,
    name: "דניאל רביבו",
    role: "ליווי לקשישים",
    area: "חולון",
    availability: "גמיש, בעיקר סופי שבוע",
  },
  {
    id: 4,
    name: "נועה פרידמן",
    role: "מיון ציוד",
    area: "גוש דן",
    availability: "פעמיים בשבוע",
  },
];

export default function VolunteersPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isHebrew = i18n.language.startsWith("he");

  function onToggleLanguage() {
    i18n.changeLanguage(isHebrew ? "en" : "he");
  }

  function onLogoutClick() {
    navigate("/", { replace: true });
  }

  function onBackToDashboard() {
    navigate("/organization/dashboard");
  }

  return (
    <div className="grid vol-page" dir={isHebrew ? "rtl" : "ltr"}>
      <header className="grid dashboard-header items-center">
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

        <h1 className="dashboard-header-title text-center">מתנדבים</h1>

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

      <main className="vol-main">
        <div className="grid vol-toolbar items-center">
          <div className="grid justify-start">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onBackToDashboard}
            >
              חזרה לדשבורד
            </Button>
          </div>

          <div className="vol-search">
            <input
              className="vol-searchInput"
              type="text"
              placeholder="חיפוש מתנדבים לפי שם, תפקיד או אזור..."
            />
          </div>

          <div className="grid justify-end">
            <Button type="button" variant="secondary" size="sm">
              Filter
            </Button>
          </div>
        </div>

        <section className="grid vol-grid">
          {MOCK_VOLUNTEERS.map((v) => (
            <article key={v.id} className="grid vol-card">
              <header className="grid vol-cardHead">
                <h2 className="vol-name">{v.name}</h2>
                <p className="vol-role">{v.role}</p>
              </header>

              <div className="grid vol-body">
                <p className="vol-field">
                  <span className="vol-label">אזור פעילות:</span>
                  <span>{v.area}</span>
                </p>

                <p className="vol-field">
                  <span className="vol-label">זמינות:</span>
                  <span>{v.availability}</span>
                </p>
              </div>

              <footer className="grid vol-footer items-center">
                <Button type="button" variant="secondary" size="sm">
                  פרטי קשר
                </Button>
                <Button type="button" variant="primary" size="sm">
                  שיוך לבקשה
                </Button>
              </footer>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
