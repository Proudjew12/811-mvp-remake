import "../Admin/Dashboard/AdminDashboard.scss"; // reuse header styles
import "./RequestPage.scss";

import Button from "../../components/button/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type RequestRow = {
  id: number;
  name: string;
  type: string;
};

const MOCK_REQUESTS: RequestRow[] = [
  {
    id: 1,
    type: "מזון",
    name: "סיוע במזון למשפחות מפונים בדירה זמנית בתל אביב",
  },
  {
    id: 2,
    type: "לוגיסטיקה ושינוע",
    name: "עזרה בהובלת ציוד לדירה חדשה",
  },
  {
    id: 3,
    type: "הסעות ותחבורה",
    name: "ליווי קשישה לטיפול רפואי",
  },
  {
    id: 4,
    type: "ציוד אישי",
    name: "תרומת בגדים לנוער בסיכון",
  },
  // add more rows as needed
];

export default function RequestPage() {
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
    <div className="requests-page">
      {/* same header style as dashboard, different title */}
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

        <h1 className="dashboard-header__title">כל הבקשות</h1>

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

      <main className="requests-main">
        {/* top bar */}
        <div className="requests-toolbar flex justify-between align-center">
          <Button type="button" variant="secondary">
            Filter 🤯
          </Button>

          <div className="requests-search-wrapper">
            <input
              className="requests-search-input"
              type="text"
              placeholder="חיפוש לפי שם בקשה או לפי פילטר חכם בכפתור..."
            />
          </div>

          <div className="requests-view-toggle flex align-center">
            <Button type="button" variant="secondary">
              Cards 📦
            </Button>
            <Button type="button" variant="primary">
              Table 📅
            </Button>
          </div>
        </div>

        {/* table */}
        <section className="requests-table-wrapper">
          <table className="requests-table">
            <thead>
              <tr>
                <th>סוג הבקשה</th>
                <th>מספר סידורי-ID</th>
                <th>שם הבקשה</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REQUESTS.map((request) => (
                <tr key={request.id}>
                  <td>{request.type}</td>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
