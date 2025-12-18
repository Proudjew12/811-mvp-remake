// @components/DashboardHeader/DashboardHeader.tsx
import { FormEvent, useState } from "react";

import "./dashboard-header.scss";
import {
  dashboardHeaderService,
  type DashboardHeaderProps,
} from "@/services/user/user-dashboard-header/user-dashboard-header-service";

export function DashboardHeader(props: DashboardHeaderProps) {
  const [query, setQuery] = useState("");

  const m = dashboardHeaderService.buildModel(props);

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    m.onSearch(dashboardHeaderService.normalizeSearchValue(query));
  }

  return (
    <div className="dashboard-header-content full-height" dir="ltr">
      <div className="dashboard-header-row grid items-center min-0 full-height">
        <div className="header-left min-0">
          <div className="header-group grid flow-col items-center gap-2 min-0">
            <div className="header-meta grid flow-col items-center gap-4 min-0">
              <span className="header-meta-text">{m.dateText}</span>
              <span className="header-meta-text">{m.timeText}</span>
              <span className="header-meta-text">{m.leftLabel}</span>
              {m.showStatusDot && (
                <span className="status-dot" aria-hidden="true" />
              )}
            </div>

            <span className="header-sep" aria-hidden="true" />

            <button
              type="button"
              className="icon-btn focus-ring"
              onClick={m.onOpenHelp}
              aria-label="עזרה"
              title="עזרה"
            >
              <span className="emoji" aria-hidden="true">
                ?
              </span>
            </button>
          </div>
        </div>

        <div className="header-right min-0">
          <div className="header-group header-group-right grid flow-col items-center gap-2 min-0">
            <form className="header-search-form min-0" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="dashboard-search">
                חיפוש
              </label>

              <div className="header-search grid flow-col items-center gap-2 min-0">
                <input
                  id="dashboard-search"
                  className="header-search-input min-0"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={m.searchPlaceholder}
                  autoComplete="off"
                />
                <span className="emoji" aria-hidden="true">
                  🔍
                </span>
              </div>
            </form>

            <span className="header-sep" aria-hidden="true" />

            <button
              type="button"
              className="icon-btn focus-ring"
              onClick={m.onOpenMessages}
              aria-label="הודעות"
              title="הודעות"
            >
              <span className="emoji" aria-hidden="true">
                ✉️
              </span>
            </button>

            <button
              type="button"
              className="icon-btn focus-ring"
              onClick={m.onOpenNotifications}
              aria-label="התראות"
              title="התראות"
            >
              <span className="emoji" aria-hidden="true">
                🔔
              </span>
            </button>

            <span className="header-sep" aria-hidden="true" />

            <button
              type="button"
              className="user-btn grid flow-col items-center gap-2 focus-ring clickable"
              onClick={m.onOpenProfile}
              aria-label="פרופיל"
              title="פרופיל"
            >
              <span className="user-name truncate">{m.userName}</span>
              <span className="emoji" aria-hidden="true">
                ▾
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
