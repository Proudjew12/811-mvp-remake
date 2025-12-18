import { useState } from "react";

import mateLogoGreen from "@assets/Logo/mate-logo-green.png";
import { userDashboardSidemenuService } from "@services/user/user-dashboard-sidemenu/user-dashboard-sidemenu";

import "./side-menu.scss";

export type SideMenuItem = {
  id: string;
  label: string;
};

export type SideMenuModel = {
  title: string;
  items: SideMenuItem[];
};

export type SideMenuProps = {
  model?: SideMenuModel;
  defaultCollapsed?: boolean;
  onSelect?: (item: SideMenuItem) => void;
};

export function SideMenu({
  model,
  defaultCollapsed = false,
  onSelect,
}: SideMenuProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const resolvedModel = model ?? userDashboardSidemenuService.getModel();
  const handleSelect = onSelect ?? (() => {});

  return (
    <aside
      className={`side-menu ${collapsed ? "side-menu-collapsed" : ""}`}
      dir="rtl"
    >
      <div className="side-menu-inner full-height grid min-0">
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
              <div className="side-menu-title">{resolvedModel.title}</div>
            </div>
          )}
        </div>

        {!collapsed && (
          <nav className="side-menu-nav min-0 overflow-auto">
            <ul className="clean-list side-menu-list grid gap-2">
              {resolvedModel.items.map((item) => (
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

export default SideMenu;
