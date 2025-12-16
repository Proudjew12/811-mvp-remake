import { useMemo, useState } from "react";

import mateLogoGreen from "@assets/Logo/mate-logo-green.png";

import "./side-menu.scss";
import {
  userDashboardSidemenuService,
  type SideMenuItem,
} from "@services/dashboard/user-dashboard-sidemenu/user-dashboard-sidemenu";

export type SideMenuProps = {
  defaultCollapsed?: boolean;
  onSelect?: (item: SideMenuItem) => void;
};

export function SideMenu({
  defaultCollapsed = false,
  onSelect,
}: SideMenuProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const copy = useMemo(() => userDashboardSidemenuService.getCopy(), []);
  const items = useMemo(() => userDashboardSidemenuService.getItems(), []);
  const handleSelect = onSelect ?? (() => {});

  return (
    <aside className={`side-menu ${collapsed ? "is-collapsed" : ""}`} dir="rtl">
      <div
        className="side-menu-inner full-height grid min-0"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <div className="side-menu-top grid items-center">
          <button
            type="button"
            className="side-menu-burger clickable focus-ring"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "פתח תפריט" : "סגור תפריט"}
            title={collapsed ? "פתח תפריט" : "סגור תפריט"}
          >
            ☰
          </button>

          {!collapsed && (
            <div className="side-menu-brand grid">
              <div className="side-menu-title">{copy.title}</div>
            </div>
          )}
        </div>

        {!collapsed && (
          <nav className="side-menu-nav min-0 overflow-auto">
            <ul className="clean-list side-menu-list grid gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="side-menu-item clickable focus-ring"
                    onClick={() => handleSelect(item)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {!collapsed && (
          <div className="side-menu-bottom grid items-center">
            <img
              className="side-menu-logo"
              src={mateLogoGreen}
              alt=""
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
