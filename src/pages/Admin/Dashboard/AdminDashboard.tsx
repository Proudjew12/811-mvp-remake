import { useMemo, useState } from "react";

import { DashboardHeader } from "@components/dashboard-header/dashboard-header";
import { SideMenu } from "@components/side-menu/side-menu";
import { Card } from "@components/card/card";
import { Button } from "@components/button/button";
import { Title } from "@components/title/title";
import { TextField } from "@components/text-field/text-field";

import "./AdminDashboard.scss";

import { adminDashboardMainService } from "@services/admin/admin-dashboard-main/admin-dashboard-main";
import { adminDashboardSidemenuService } from "@services/admin/admin-dashboard-sidemenu/admin-dashboard-sidemenu";

export default function AdminDashboard() {
  const model = useMemo(() => adminDashboardMainService.getModel(), []);
  const sideMenuModel = useMemo(
    () => adminDashboardSidemenuService.getModel(),
    []
  );

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const maxTotal = useMemo(
    () => adminDashboardMainService.getChartMaxTotal(model.chart.rows),
    [model.chart.rows]
  );

  return (
    <section
      className="admin-dashboard full-height overflow-hidden grid admin-dashboard-layout"
      dir="ltr"
    >
      <header className="admin-dashboard-header full">
        <DashboardHeader userName={model.header.userName} />
      </header>

      <div className="admin-dashboard-body full min-0 overflow-hidden grid admin-dashboard-bodylayout">
        <main className="admin-dashboard-main min-0 overflow-hidden grid gap-3">
          <div
            className="admin-top grid items-center gap-3 admin-toplayout"
            dir="ltr"
          >
            <div
              className="admin-actions grid flow-col items-center gap-2"
              dir="rtl"
            >
              {model.actions.map((a) => (
                <Button
                  key={a.id}
                  variant="secondary"
                  size="sm"
                  onClick={a.onClick}
                >
                  {a.label}
                </Button>
              ))}
            </div>

            <div className="admin-outertitle text-right" dir="rtl">
              <Title level={2} variant="page">
                {model.header.topTitle}
              </Title>
            </div>
          </div>

          <div
            className="admin-grid grid gap-3 min-0 admin-gridlayout"
            dir="ltr"
          >
            <section className="admin-area-chart min-0" dir="rtl">
              <Card variant="outline" className="admin-panel min-0 full-height">
                <div className="admin-panel-inner min-0 full-height grid gap-2">
                  <div className="admin-panel-head grid items-center gap-2">
                    <span className="admin-panel-icon" aria-hidden="true">
                      {model.chart.icon}
                    </span>
                    <Title level={3} variant="section" className="text-center">
                      {model.chart.title}
                    </Title>

                    <div className="admin-panel-tools grid flow-col items-center gap-2">
                      {model.chart.filters.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          className="admin-toolbtn clickable focus-ring"
                          aria-label={f.label}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="admin-panel-scroll min-0 overflow-auto">
                    <ul className="clean-list admin-chartlist grid gap-2">
                      {model.chart.rows.map((row) => (
                        <li
                          key={row.label}
                          className="admin-chartrow grid items-center gap-2"
                        >
                          <div className="admin-chartlabel">{row.label}</div>

                          <div className="admin-chartbar">
                            <div className="admin-chartstack">
                              {row.parts.map((p, idx) => (
                                <span
                                  key={`${row.label}-${idx}`}
                                  className="admin-chartpart"
                                  style={{
                                    width: `${Math.round(
                                      (p / maxTotal) * 100
                                    )}%`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="admin-chartvalue">{row.total}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            <section className="admin-area-requests min-0" dir="rtl">
              <Card variant="outline" className="admin-panel min-0 full-height">
                <div className="admin-panel-inner min-0 full-height grid gap-2">
                  <div className="admin-panel-head grid items-center gap-2">
                    <span className="admin-panel-icon" aria-hidden="true">
                      {model.requests.icon}
                    </span>
                    <Title level={3} variant="section" className="text-center">
                      {model.requests.title}
                    </Title>
                    <span className="admin-panel-spacer" aria-hidden="true" />
                  </div>

                  <div className="admin-panel-scroll min-0 overflow-auto">
                    <ul className="clean-list grid gap-2">
                      {model.requests.items.map((r) => (
                        <li key={r.id} className="admin-request grid">
                          <div
                            className="admin-request-icon"
                            aria-hidden="true"
                          >
                            {r.icon}
                          </div>

                          <div className="admin-request-body grid gap-1">
                            <div className="admin-itemtitle">{r.title}</div>
                            <div className="admin-itemmeta text-muted">
                              {r.meta}
                            </div>
                            <Button variant="secondary" size="sm" fullWidth>
                              מידע נוסף
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            <section className="admin-area-tasks min-0" dir="rtl">
              <Card variant="outline" className="admin-panel min-0 full-height">
                <div className="admin-panel-inner min-0 full-height grid gap-2">
                  <div className="admin-panel-head grid items-center gap-2">
                    <span className="admin-panel-icon" aria-hidden="true">
                      {model.tasks.icon}
                    </span>
                    <Title level={3} variant="section" className="text-center">
                      {model.tasks.title}
                    </Title>
                    <span className="admin-panel-spacer" aria-hidden="true" />
                  </div>

                  <div className="admin-panel-scroll min-0 overflow-auto">
                    <ul className="clean-list grid gap-2">
                      {model.tasks.items.map((t) => (
                        <li key={t.id} className="admin-task grid">
                          <div className="admin-task-icon" aria-hidden="true">
                            {t.icon}
                          </div>

                          <div className="admin-task-body grid gap-1">
                            <div className="admin-itemtitle">{t.title}</div>
                            <div className="admin-itemmeta text-muted">
                              {t.meta}
                            </div>
                            <Button variant="secondary" size="sm" fullWidth>
                              מידע נוסף
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            <section className="admin-area-messages min-0" dir="rtl">
              <Card variant="outline" className="admin-panel min-0 full-height">
                <div className="admin-panel-inner min-0 full-height grid gap-2">
                  <div className="admin-panel-head grid items-center gap-2">
                    <span className="admin-panel-icon" aria-hidden="true">
                      {model.messages.icon}
                    </span>
                    <Title level={3} variant="section" className="text-center">
                      {model.messages.title}
                    </Title>
                    <span className="admin-panel-spacer" aria-hidden="true" />
                  </div>

                  <div className="admin-messages-form grid gap-2">
                    <TextField
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="נמען"
                      dir="rtl"
                    />
                    <TextField
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="נושא"
                      dir="rtl"
                    />
                    <TextField
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="גוף ההודעה"
                      multiline
                      rows={4}
                      dir="rtl"
                    />
                    <Button variant="secondary" fullWidth>
                      שליחה
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            <section className="admin-area-orgs min-0" dir="rtl">
              <Card variant="outline" className="admin-panel min-0 full-height">
                <div className="admin-panel-inner min-0 full-height grid gap-2">
                  <div className="admin-panel-head grid items-center gap-2">
                    <span className="admin-panel-icon" aria-hidden="true">
                      {model.orgs.icon}
                    </span>
                    <Title level={3} variant="section" className="text-center">
                      {model.orgs.title}
                    </Title>
                    <span className="admin-panel-spacer" aria-hidden="true" />
                  </div>

                  <div className="admin-panel-scroll min-0 overflow-auto">
                    <ul className="clean-list grid gap-2">
                      {model.orgs.items.map((o) => (
                        <li
                          key={o.id}
                          className="admin-orgrow grid items-center gap-2"
                        >
                          <div className="admin-orgtext min-0">
                            <div className="admin-itemtitle truncate">
                              {o.title}
                            </div>
                            <div className="admin-itemmeta text-muted truncate">
                              {o.meta}
                            </div>
                          </div>

                          <button
                            type="button"
                            className="admin-rowbtn clickable focus-ring"
                            aria-label="כניסה"
                          >
                            ›
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            <section className="admin-area-alerts min-0" dir="rtl">
              <Card variant="outline" className="admin-panel min-0 full-height">
                <div className="admin-panel-inner min-0 full-height grid gap-2">
                  <div className="admin-panel-head grid items-center gap-2">
                    <span className="admin-panel-icon" aria-hidden="true">
                      {model.alerts.icon}
                    </span>
                    <Title level={3} variant="section" className="text-center">
                      {model.alerts.title}
                    </Title>
                    <span className="admin-panel-spacer" aria-hidden="true" />
                  </div>

                  <div className="admin-panel-scroll min-0 overflow-auto">
                    <ul className="clean-list grid gap-2">
                      {model.alerts.items.map((a) => (
                        <li key={a.id} className="admin-alert grid gap-1">
                          <div className="admin-alerttop grid items-center gap-2">
                            <div className="admin-alerttime text-muted">
                              {a.time}
                            </div>
                            <div className="admin-alerttitle">{a.title}</div>
                          </div>
                          <div className="admin-alerttext text-muted">
                            {a.text}
                          </div>
                          <button
                            type="button"
                            className="admin-linkbtn clickable"
                          >
                            לצפייה
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </main>

        <SideMenu model={sideMenuModel} defaultCollapsed={false} />
      </div>
    </section>
  );
}
