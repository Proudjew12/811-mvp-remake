import React, { useState } from "react";
import "./SideMenu.scss";
import mateLogoGreen from "@assets/Logo/mate-logo-green.png";

type MenuItem = { id: string; label: string };

const ITEMS: MenuItem[] = [
  { id: "my-requests", label: "ניהול הבקשות שלי" },
  { id: "active-tasks", label: "ניהול משימות בטיפול" },
  { id: "market", label: "מרקט פלייס" },
  { id: "internal-org", label: "ניהול ארגון פנימי" },
  { id: "org-directory", label: "אלפון ארגונים" },
  { id: "messages", label: "מערכת הודעות" },
  { id: "settings", label: "הגדרות מערכת" },
];

export type SideMenuProps = {
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapsed?: (next: boolean) => void;
};

export default function SideMenu({
  activeId = "my-requests",
  onSelect,
  collapsed: collapsedProp,
  onToggleCollapsed,
}: SideMenuProps) {
  const [collapsedSelf, setCollapsedSelf] = useState(false);
  const collapsed = collapsedProp ?? collapsedSelf;

  function toggle() {
    if (onToggleCollapsed) onToggleCollapsed(!collapsed);
    else setCollapsedSelf(!collapsed);
  }

  return (
    <aside
      className={`side-menu ${collapsed ? "is-collapsed" : ""}`}
      dir="rtl"
      aria-label="מרכז בקרה"
    >
      <div className="side-menu__head">
        <button
          type="button"
          className="side-menu__hamburger"
          aria-label="פתח/סגור תפריט"
          aria-pressed={!collapsed}
          onClick={toggle}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="side-menu__content flex column">
        <h2 className="side-menu__title">מרכז בקרה</h2>

        <ul className="clean-list side-menu__list">
          {ITEMS.map((it) => {
            const active = it.id === activeId;
            return (
              <li key={it.id}>
                <button
                  type="button"
                  className={`side-menu__link${active ? " is-active" : ""}`}
                  onClick={() => onSelect?.(it.id)}
                  aria-current={active ? "page" : undefined}
                >
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="side-menu__brand">
          <img
            className="side-menu__brand-img"
            src={mateLogoGreen}
            alt="מטה המתנדבים הארצי"
          />
        </div>
      </div>
    </aside>
  );
}
