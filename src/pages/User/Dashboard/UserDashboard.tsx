import { useMemo, useState } from "react";

import { DashboardHeader } from "@components/dashboard-header/dashboard-header";
import { Card } from "@components/card/card";
import { Button } from "@components/button/button";
import { Title } from "@components/title/title";
import { TextField } from "@components/text-field/text-field";

import "./UserDashboard.scss";
import { userDashboardMainService } from "@services/dashboard/user-dashboard-main/user-dashboard-main";

export default function UserDashboard() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const copy = useMemo(() => userDashboardMainService.getCopy(), []);
  const stats = useMemo(() => userDashboardMainService.getStats(), []);
  const relevantTasks = useMemo(
    () => userDashboardMainService.getRelevantTasks(),
    []
  );

  return (
    <section
      className="user-dashboard main-layout full-height overflow-hidden grid"
      style={{ gridTemplateRows: "auto 1fr" }}
      dir="ltr"
    >
      <header className="user-dashboard-header full">
        <DashboardHeader userName="שני" />
      </header>

      <main className="user-dashboard-main full min-0 overflow-hidden grid gap-3">
        <div
          className="user-dashboard-top grid items-center gap-3"
          style={{ gridTemplateColumns: "auto 1fr" }}
          dir="ltr"
        >
          <div
            className="user-dashboard-actions grid flow-col items-center gap-2"
            dir="rtl"
          >
            <Button variant="secondary" size="sm">
              {copy.btnDonate}
            </Button>
            <Button variant="secondary" size="sm">
              {copy.btnRequest}
            </Button>
          </div>

          <div className="user-dashboard-outertitle text-right" dir="rtl">
            <Title level={2} variant="page">
              {copy.topTitle}
            </Title>
          </div>
        </div>

        <div
          className="user-dashboard-grid grid gap-3 min-0"
          style={{
            gridTemplateColumns:
              "220px minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr)",
          }}
          dir="ltr"
        >
          <section className="min-0" dir="rtl">
            <Card variant="outline" className="dash-card">
              <div className="dash-inner">
                <Title level={3} variant="section" className="text-center">
                  {copy.overviewTitle}
                </Title>
                <div className="dash-sub text-center">
                  {copy.overviewSubtitle}
                </div>

                <ul className="clean-list dash-stats grid gap-2">
                  {stats.map((s) => (
                    <li
                      key={s.label}
                      className="dash-statrow grid items-center gap-2"
                      style={{ gridTemplateColumns: "1fr auto" }}
                    >
                      <span className="dash-statlabel">{s.label}</span>
                      <span className="dash-statvalue">{s.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>

          <section className="min-0 grid gap-3" dir="rtl">
            <Card variant="outline" className="dash-card min-0">
              <div className="dash-inner min-0 grid gap-3">
                <Title level={3} variant="section" className="text-center">
                  {copy.messagesTitle}
                </Title>

                <Title level={4} variant="label">
                  {copy.outgoingTitle}
                </Title>

                <div className="grid gap-2">
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
                </div>

                <Button variant="secondary" fullWidth>
                  שליחה
                </Button>
              </div>
            </Card>

            <Card variant="outline" className="dash-card min-0">
              <div className="dash-inner min-0 grid gap-2">
                <Title level={4} variant="label">
                  {copy.incomingTitle}
                </Title>

                <div className="dash-scroll overflow-auto min-0">
                  <ul className="clean-list dash-list grid gap-2">
                    {userDashboardMainService.getIncomingMessages().map((m) => (
                      <li key={m.id} className="dash-listitem grid gap-2">
                        <div className="dash-listtitle">{m.title}</div>
                        <div className="dash-listtext text-muted">{m.text}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          <section className="min-0 grid gap-3" dir="rtl">
            <Card variant="outline" className="dash-card min-0">
              <div className="dash-inner min-0 grid gap-2">
                <Title level={3} variant="section" className="text-center">
                  {copy.tasksInProgressTitle}
                </Title>

                <div className="dash-cardhint text-muted text-center">
                  {copy.tasksInProgressHint}
                </div>

                <div className="dash-taskpreview grid gap-2">
                  <div className="dash-listtitle">{copy.taskPreviewTitle}</div>
                  <div className="dash-meta text-muted">
                    {copy.taskPreviewMeta}
                  </div>

                  <div className="grid flow-col gap-2">
                    <Button variant="secondary" size="sm" fullWidth>
                      פרטי המשימה
                    </Button>
                    <Button variant="primary" size="sm" fullWidth>
                      ניהול משימה
                    </Button>
                  </div>
                </div>

                <Button variant="secondary" fullWidth>
                  לכל המשימות בטיפול
                </Button>
              </div>
            </Card>

            <Card variant="outline" className="dash-card min-0">
              <div className="dash-inner min-0 grid gap-2">
                <Title level={3} variant="section" className="text-center">
                  {copy.myRequestsTitle}
                </Title>

                <div className="dash-cardhint text-muted text-center">
                  {copy.myRequestsHint}
                </div>

                <div className="dash-taskpreview grid gap-2">
                  <div className="dash-listtitle">
                    {copy.requestPreviewTitle}
                  </div>
                  <div className="dash-meta text-muted">
                    {copy.requestPreviewMeta}
                  </div>

                  <div className="grid flow-col gap-2">
                    <Button variant="secondary" size="sm" fullWidth>
                      פרטי הבקשה
                    </Button>
                    <Button variant="primary" size="sm" fullWidth>
                      עריכת הבקשה
                    </Button>
                  </div>
                </div>

                <Button variant="secondary" fullWidth>
                  לכל הבקשות שלי
                </Button>
              </div>
            </Card>
          </section>

          <section className="min-0" dir="rtl">
            <Card variant="outline" className="dash-card min-0 full-height">
              <div className="dash-inner min-0 full-height grid gap-2">
                <Title level={3} variant="section" className="text-center">
                  {copy.relevantTitle}
                </Title>

                <div className="dash-scroll overflow-auto min-0">
                  <ul className="clean-list dash-tasklist grid gap-3">
                    {relevantTasks.map((t) => (
                      <li
                        key={`${t.title}-${t.date}`}
                        className="dash-task grid gap-2"
                      >
                        <div className="dash-listtitle">{t.title}</div>
                        <div className="dash-meta text-muted">
                          {t.place} • {t.time} • {t.date}
                        </div>

                        <div className="grid flow-col gap-2">
                          <Button variant="secondary" size="sm" fullWidth>
                            מידע נוסף
                          </Button>
                          <Button variant="primary" size="sm" fullWidth>
                            משימת משנה
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="secondary" fullWidth>
                  מעבר למרכז פלייס
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </section>
  );
}
