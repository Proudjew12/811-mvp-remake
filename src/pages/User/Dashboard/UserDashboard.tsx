import React from "react";
import "./UserDashboard.scss";
import SideMenu from "@components/side-menu/SideMenu";

function UserDashboardHeader() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const formattedTime = now.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="user-dashboard__header">
      <div className="flex user-dashboard__header-row">
        <div className="flex user-dashboard__header-right">
          <div className="flex user-dashboard__user-chip">
            <div className="user-dashboard__avatar" aria-hidden="true">
              <span className="user-dashboard__avatar-layer user-dashboard__avatar-layer--outer" />
              <span className="user-dashboard__avatar-layer user-dashboard__avatar-layer--inner" />
            </div>
            <span className="user-dashboard__user-name">דנה לוי</span>
          </div>

          <button
            type="button"
            className="user-dashboard__icon-button"
            aria-label="התראות"
          >
            <span aria-hidden>🔔</span>
          </button>
          <button
            type="button"
            className="user-dashboard__icon-button"
            aria-label="הודעות"
          >
            <span aria-hidden>💬</span>
          </button>
          <button
            type="button"
            className="flex user-dashboard__search-pill"
            aria-label="חיפוש"
          >
            <span className="user-dashboard__search-icon" aria-hidden>
              🔍
            </span>
          </button>
        </div>

        <div className="flex user-dashboard__header-left">
          <button
            type="button"
            className="user-dashboard__help-button"
            aria-label="עזרה"
            title="עזרה"
          >
            ?
          </button>
          <div className="flex user-dashboard__routine-pill" aria-label="שגרה">
            <span className="user-dashboard__routine-label">שגרה</span>
            <div className="user-dashboard__routine-icon" aria-hidden="true">
              <span className="user-dashboard__routine-layer user-dashboard__routine-layer--outer" />
              <span className="user-dashboard__routine-layer user-dashboard__routine-layer--inner" />
            </div>
          </div>
          <time
            className="user-dashboard__header-time"
            dateTime={now.toISOString()}
          >
            {formattedTime}
          </time>
          <span className="user-dashboard__header-date">{formattedDate}</span>
        </div>
      </div>
    </header>
  );
}

export default function UserDashboard() {
  const [active, setActive] = React.useState("my-requests");
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="user-dashboard" dir="rtl">
      <UserDashboardHeader />

      {/* Body: fixed height (fills viewport below header) */}
      <div className="flex user-dashboard__body">
        {/* Sidebar fills the body height */}
        <SideMenu
          activeId={active}
          onSelect={setActive}
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
        />

        {/* Main content fills remaining space and scrolls internally */}
        <main
          className="user-dashboard__content"
          role="main"
          aria-label="תוכן מרכזי"
        >
          {/* Your tabs/content */}
        </main>
      </div>
    </div>
  );
}
