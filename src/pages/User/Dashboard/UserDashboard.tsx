// src/pages/UserDashboard.tsx
import React from "react";
import "./UserDashboard.scss";

/* =========================
   HEADER
   ========================= */

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

  const userName = "דנה לוי"; // later: from auth

  return (
    <header className="user-dashboard__header">
      <div className="flex user-dashboard__header-row">
        {/* FIRST in DOM = RIGHT side (RTL) → search + icons + user */}
        <div className="flex user-dashboard__header-right">
          {/* User chip */}
          <div className="flex user-dashboard__user-chip">
            <div className="user-dashboard__avatar">
              <span className="user-dashboard__avatar-layer user-dashboard__avatar-layer--outer" />
              <span className="user-dashboard__avatar-layer user-dashboard__avatar-layer--inner" />
            </div>
            <span className="user-dashboard__user-name">{userName}</span>
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="user-dashboard__icon-button"
            aria-label="התראות"
          >
            <span aria-hidden="true">🔔</span>
          </button>

          {/* Messages */}
          <button
            type="button"
            className="user-dashboard__icon-button"
            aria-label="הודעות"
          >
            <span aria-hidden="true">💬</span>
          </button>

          {/* Search pill */}
          <button
            type="button"
            className="flex user-dashboard__search-pill"
            aria-label="חיפוש"
          >
            <span className="user-dashboard__search-icon" aria-hidden="true">
              🔍
            </span>
          </button>
        </div>

        {/* SECOND in DOM = LEFT side (RTL) → date / time / שגרה / ? */}
        <div className="flex user-dashboard__header-left">
          {/* Help button */}
          <button
            type="button"
            className="user-dashboard__help-button"
            aria-label="עזרה"
          >
            ?
          </button>

          {/* Routine pill */}
          <div className="flex user-dashboard__routine-pill">
            <span className="user-dashboard__routine-label">שגרה</span>
            {/* Routine icon (double circle) */}
            <div className="user-dashboard__routine-icon">
              <span className="user-dashboard__routine-layer user-dashboard__routine-layer--outer" />
              <span className="user-dashboard__routine-layer user-dashboard__routine-layer--inner" />
            </div>
          </div>

          {/* Time */}
          <span className="user-dashboard__header-time">{formattedTime}</span>

          {/* Date */}
          <span className="user-dashboard__header-date">{formattedDate}</span>
        </div>
      </div>
    </header>
  );
}

/* =========================
   SIDEBAR
   ========================= */

type UserDashboardSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

function UserDashboardSidebar({
  collapsed,
  onToggle,
}: UserDashboardSidebarProps) {
  return (
    <aside
      className={`user-dashboard__sidebar ${
        collapsed ? "user-dashboard__sidebar--collapsed" : ""
      }`}
    >
      {/* Hamburger toggle (3 lines) */}
      <button
        type="button"
        className="flex user-dashboard__sidebar-toggle"
        onClick={onToggle}
        aria-label={collapsed ? "פתח תפריט" : "סגור תפריט"}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Inner content we hide when collapsed */}
      <div className="flex user-dashboard__sidebar-inner">
        {/* TOP logo placeholder – replace with real img later if you want */}
        <div className="flex user-dashboard__sidebar-logo-top">
          <span className="user-dashboard__sidebar-logo-top-text">לב אחד</span>
        </div>

        {/* NAV links */}
        <nav className="flex user-dashboard__sidebar-nav" aria-label="תפריט צד">
          <h2 className="user-dashboard__sidebar-title">מרכז בקרה</h2>

          <button
            type="button"
            className="user-dashboard__sidebar-link user-dashboard__sidebar-link--active"
          >
            ניהול הבקשות שלי
          </button>

          <button type="button" className="user-dashboard__sidebar-link">
            ניהול משימות בטיפול
          </button>

          <button type="button" className="user-dashboard__sidebar-link">
            מרקט פלייס
          </button>

          <button type="button" className="user-dashboard__sidebar-link">
            ניהול ארגון פנימי
          </button>

          <button type="button" className="user-dashboard__sidebar-link">
            אלפון ארגונים
          </button>

          <button type="button" className="user-dashboard__sidebar-link">
            מערכת הודעות
          </button>

          <button type="button" className="user-dashboard__sidebar-link">
            הגדרות מערכת
          </button>
        </nav>

        {/* BOTTOM logo placeholder – replace later */}
        <div className="flex user-dashboard__sidebar-logo-bottom">
          <span className="user-dashboard__sidebar-logo-bottom-text">
            חמ״ל ארצי
          </span>
        </div>
      </div>
    </aside>
  );
}

/* =========================
   PAGE WRAPPER
   ========================= */

function UserDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="user-dashboard">
      <UserDashboardHeader />

      {/* Body: sidebar + content */}
      <div className="flex user-dashboard__body">
        <UserDashboardSidebar
          collapsed={isSidebarCollapsed}
          onToggle={handleToggleSidebar}
        />

        <main className="user-dashboard__content">
          {/* dashboard content will go here */}
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
