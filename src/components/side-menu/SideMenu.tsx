// src/components/side-menu/SideMenu.tsx
import "./SideMenu.scss";
import mateLogoGreen from "../../assets/Logo mate-logo-green.png";

export type SideMenuProps = {
  isHebrew: boolean;
};

type SideMenuItem = {
  id: string;
  label: string;
};

export default function SideMenu({ isHebrew }: SideMenuProps) {
  const title = isHebrew ? "מרכז בקרה" : "Control center";

  const items: SideMenuItem[] = isHebrew
    ? [
        { id: "my-requests", label: "ניהול הבקשות שלי" },
        { id: "active-tasks", label: "ניהול משימות בטיפול" },
        { id: "marketplace", label: "מרקט פלייס" },
        { id: "internal-org", label: "ניהול ארגון פנימי" },
        { id: "org-directory", label: "אלפון ארגונים" },
        { id: "messages", label: "מערכת הודעות" },
        { id: "settings", label: "הגדרות מערכת" },
      ]
    : [
        { id: "my-requests", label: "My requests" },
        { id: "active-tasks", label: "Active tasks" },
        { id: "marketplace", label: "Marketplace" },
        { id: "internal-org", label: "Internal organization" },
        { id: "org-directory", label: "Organizations directory" },
        { id: "messages", label: "Messages" },
        { id: "settings", label: "System settings" },
      ];

  return (
    <aside className="user-dashboard-side-menu" aria-label={title}>
      <div className="user-dashboard-side-menu__inner">
        <header className="user-dashboard-side-menu__header">
          <span className="user-dashboard-side-menu__title">{title}</span>
        </header>

        <nav className="user-dashboard-side-menu__nav" aria-label={title}>
          <ul className="user-dashboard-side-menu__list clean-list">
            {items.map((item) => (
              <li key={item.id} className="user-dashboard-side-menu__item">
                <button
                  type="button"
                  className="user-dashboard-side-menu__link"
                >
                  <span className="user-dashboard-side-menu__link-text">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="user-dashboard-side-menu__logo">
          <img
            src={mateLogoGreen}
            alt={
              isHebrew
                ? "מטה המתנדבים הארצי"
                : "National volunteers headquarters"
            }
            className="user-dashboard-side-menu__logo-img"
          />
        </div>
      </div>
    </aside>
  );
}
