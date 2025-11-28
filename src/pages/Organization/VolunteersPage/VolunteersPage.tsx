import "../../Admin/Dashboard/AdminDashboard.scss"; // reuse header styles
import "./VolunteersPage.scss";

import Button from "../../../components/button/button";
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
    <div className="volunteers-page">
      {/* HEADER (reusing dashboard-header styles) */}
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

        <h1 className="dashboard-header__title">מתנדבים</h1>

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

      <main className="volunteers-main">
        {/* TOP BAR */}
        <div className="volunteers-toolbar flex justify-between align-center">
          <div className="volunteers-toolbar__left flex align-center">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onBackToDashboard}
            >
              חזרה לדשבורד
            </Button>
          </div>

          <div className="volunteers-search-wrapper">
            <input
              className="volunteers-search-input"
              type="text"
              placeholder="חיפוש מתנדבים לפי שם, תפקיד או אזור..."
            />
          </div>

          <div className="volunteers-toolbar__right flex align-center">
            <Button type="button" variant="secondary" size="sm">
              Filter 🤯
            </Button>
          </div>
        </div>

        {/* VOLUNTEERS GRID */}
        <section className="volunteers-grid grid">
          {MOCK_VOLUNTEERS.map((volunteer) => (
            <article key={volunteer.id} className="volunteer-card">
              <header className="volunteer-card__header">
                <h2 className="volunteer-card__name">{volunteer.name}</h2>
                <p className="volunteer-card__role">{volunteer.role}</p>
              </header>

              <div className="volunteer-card__body">
                <p className="volunteer-card__field">
                  <span className="volunteer-card__label">אזור פעילות:</span>
                  <span>{volunteer.area}</span>
                </p>
                <p className="volunteer-card__field">
                  <span className="volunteer-card__label">זמינות:</span>
                  <span>{volunteer.availability}</span>
                </p>
              </div>

              <footer className="volunteer-card__footer flex justify-between align-center">
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
