import React from "react";
import "./UserDashboard.scss";

import SideMenu from "@components/side-menu/SideMenu";
import { Card } from "@components/card/card";
import Title from "@components/title/title";
import { getUserDashboardData } from "@services/UserDashboard/UserDashboard.service";

function UserHeader() {
  const now = new Date();
  const dateLabel = now.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const timeLabel = now.toLocaleTimeString("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="grid userHeader">
      <div className="grid userHeaderRow">
        <div className="grid userHeaderRight">
          <div className="grid userIdentity flow-col items-center gap-2">
            <div className="userAvatar" aria-hidden="true">
              <span className="userAvatarLayer userAvatarLayerOuter" />
              <span className="userAvatarLayer userAvatarLayerInner" />
            </div>
            <span className="userName">דנה לוי</span>
          </div>

          <button type="button" className="userIconBtn" aria-label="התראות">
            <span aria-hidden>🔔</span>
          </button>

          <button type="button" className="userIconBtn" aria-label="הודעות">
            <span aria-hidden>💬</span>
          </button>

          <button
            type="button"
            className="grid userSearchBtn place-center"
            aria-label="חיפוש"
          >
            <span aria-hidden>🔍</span>
          </button>
        </div>

        <div className="grid userHeaderLeft">
          <button
            type="button"
            className="userHelpBtn"
            aria-label="עזרה"
            title="עזרה"
          >
            ?
          </button>

          <div
            className="grid userRoutine flow-col items-center gap-2"
            aria-label="שגרה"
          >
            <span className="userRoutineLabel">שגרה</span>
            <div className="userRoutineIcon" aria-hidden="true">
              <span className="userRoutineLayer userRoutineLayerOuter" />
              <span className="userRoutineLayer userRoutineLayerInner" />
            </div>
          </div>

          <time className="userTime" dateTime={now.toISOString()}>
            {timeLabel}
          </time>
          <span className="userDate">{dateLabel}</span>
        </div>
      </div>
    </header>
  );
}

export default function UserDashboard() {
  const [activeId, setActiveId] = React.useState("my-requests");
  const [isMenuCollapsed, setIsMenuCollapsed] = React.useState(false);

  const { overviewStats, suggestedTasks, inboxMessages, myRequests } =
    getUserDashboardData();

  return (
    <div className="grid userDashboard" dir="rtl">
      <UserHeader />

      <div className="grid userBody">
        <aside className="userSidebar" aria-label="תפריט צד">
          <SideMenu
            activeId={activeId}
            onSelect={setActiveId}
            collapsed={isMenuCollapsed}
            onToggleCollapsed={setIsMenuCollapsed}
          />
        </aside>

        <main className="userMain" role="main" aria-label="תוכן מרכזי">
          <div className="grid userCards gap-3">
            <Card className="grid userCard userCardOverview">
              <section
                className="grid overview"
                aria-label="מבט על – נתוני פעילות"
              >
                <header className="grid overviewHead">
                  <div className="grid overviewTitle flow-col items-center gap-2">
                    <span aria-hidden>🏢</span>
                    <Title
                      level={3}
                      variant="section"
                      className="overviewTitleText"
                    >
                      מבט על
                    </Title>
                  </div>

                  <button type="button" className="linkBtn">
                    נתוני פעילות חודשיים
                  </button>
                </header>

                <ul className="grid overviewList clean-list gap-2">
                  {overviewStats.map((stat) => (
                    <li key={stat.id} className="overviewItem">
                      <div className="grid overviewItemHead">
                        <span className="overviewItemLabel">{stat.label}</span>
                        <span aria-hidden>{stat.icon}</span>
                      </div>
                      <div className="overviewItemValue">{stat.value}</div>
                    </li>
                  ))}
                </ul>
              </section>
            </Card>

            <Card className="grid userCard userCardBroadcast">
              <section className="grid broadcast" aria-label="הודעות יוצאות">
                <header className="grid broadcastHead">
                  <h3 className="broadcastTitle">הודעות יוצאות</h3>
                  <span aria-hidden>📤</span>
                </header>

                <form
                  className="grid broadcastForm gap-2"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <input
                    type="text"
                    className="input"
                    placeholder="נושא"
                    aria-label="נושא"
                  />

                  <textarea
                    className="input textarea"
                    placeholder="גוף ההודעה"
                    aria-label="גוף ההודעה"
                  />

                  <button type="submit" className="primaryBtn">
                    שליחה
                  </button>
                </form>
              </section>
            </Card>

            <Card className="grid userCard userCardTasks">
              <section className="grid tasks" aria-label="ניהול משימות בטיפולי">
                <header className="grid tasksHead gap-2">
                  <div className="grid flow-col items-center gap-2">
                    <Title level={3} variant="section">
                      ניהול משימות בטיפולי
                    </Title>
                    <span aria-hidden>📋</span>
                  </div>

                  <p className="mutedText">
                    משימות שהארגון משך ותאריך היעד שלהן בימים הקרובים.
                  </p>
                </header>

                <div className="grid taskBox gap-2">
                  <div className="grid taskBoxHead">
                    <button type="button" className="taskTitle">
                      חלוקת מנות חמות בבתי ספר לילדי מפונים
                    </button>
                    <span aria-hidden>☕</span>
                  </div>

                  <div className="grid chips cols-5 gap-2">
                    <div className="chip">
                      <span aria-hidden>📅</span>
                      <span>19/11/25</span>
                    </div>
                    <div className="chip">
                      <span aria-hidden>⏰</span>
                      <span>11:00–15:00</span>
                    </div>
                    <div className="chip">
                      <span aria-hidden>📍</span>
                      <span>באר שבע</span>
                    </div>
                    <div className="chip">
                      <span aria-hidden>⚕️</span>
                      <span>טיפולי</span>
                    </div>
                    <div className="chip">
                      <span aria-hidden>👥</span>
                      <span>7 אנשי צוות</span>
                    </div>
                  </div>

                  <div className="grid taskActions cols-3 gap-2 items-center">
                    <button type="button" className="secondaryBtn">
                      פרטי המשימה
                    </button>
                    <button type="button" className="primaryBtn">
                      ניהול משימה
                    </button>
                    <button
                      type="button"
                      className="iconBtn"
                      aria-label="רענון המשימה"
                    >
                      🔄
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="grid ghostBtn flow-col items-center"
                >
                  <span>לכל המשימות בטיפולי</span>
                  <span aria-hidden>☰</span>
                </button>
              </section>
            </Card>

            <Card className="grid userCard userCardMarket">
              <section
                className="grid market"
                aria-label="משימות רלוונטיות בשבילך"
              >
                <header className="grid marketHead gap-2">
                  <div className="grid flow-col items-center gap-2">
                    <Title level={3} variant="section">
                      משימות רלוונטיות בשבילך
                    </Title>
                    <span aria-hidden>🧺</span>
                  </div>

                  <p className="mutedText">
                    משימות פתוחות שעלו למערכת, אושרו ומתאימות לפרופיל לשייך
                    לטובת סיוע.
                  </p>
                </header>

                <div className="grid marketList gap-2">
                  {suggestedTasks.map((task) => (
                    <article key={task.id} className="grid taskBox gap-2">
                      <div className="grid taskBoxHead">
                        <button type="button" className="taskTitle">
                          {task.title}
                        </button>
                        <span aria-hidden>{task.icon}</span>
                      </div>

                      <div className="grid chips cols-3 gap-2">
                        <div className="chip">
                          <span aria-hidden>📅</span>
                          <span>{task.date}</span>
                        </div>
                        <div className="chip">
                          <span aria-hidden>⏰</span>
                          <span>{task.time}</span>
                        </div>
                        <div className="chip">
                          <span aria-hidden>📍</span>
                          <span>{task.location}</span>
                        </div>
                      </div>

                      <div className="grid chips cols-2 gap-2">
                        <div className="chip">
                          <span aria-hidden>•</span>
                          <span>{task.tag}</span>
                        </div>
                        <div className="chip">
                          <span aria-hidden>🏢</span>
                          <span>{task.origin}</span>
                        </div>
                      </div>

                      <div className="grid taskActions cols-2 gap-2">
                        <button type="button" className="secondaryBtn">
                          מידע נוסף
                        </button>
                        <button type="button" className="primaryBtn">
                          משיכת משימה
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="grid ghostBtn flow-col items-center"
                >
                  <span>מעבר למרקט פלייס</span>
                  <span aria-hidden>☰</span>
                </button>
              </section>
            </Card>

            <Card className="grid userCard userCardInbox">
              <section className="grid inbox" aria-label="הודעות והתראות">
                <ul className="grid inboxList clean-list gap-2">
                  {inboxMessages.map((msg) => (
                    <li key={msg.id} className="inboxItem">
                      <button type="button" className="grid inboxBtn gap-2">
                        <div className="grid inboxMeta">
                          <div className="grid inboxMetaLeft flow-col items-center gap-2">
                            <span className="mutedText">{msg.time}</span>
                            <span className="mutedText">{msg.dateLabel}</span>
                          </div>
                          <span aria-hidden>‹</span>
                        </div>

                        <div className="inboxTitle">{msg.title}</div>
                        <p className="mutedText inboxPreview">{msg.preview}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </Card>

            <Card className="grid userCard userCardRequests">
              <section className="grid requests" aria-label="ניהול הבקשות שלי">
                <header className="grid requestsHead gap-2">
                  <div className="grid flow-col items-center gap-2">
                    <Title level={3} variant="section">
                      ניהול הבקשות שלי
                    </Title>
                    <span aria-hidden>✏️</span>
                  </div>

                  <p className="mutedText">
                    בקשות שהארגון העלה למערכת ומתמיינות לאישור או שיוך.
                  </p>
                </header>

                <div className="grid requestsList gap-2">
                  {myRequests.map((req) => (
                    <article key={req.id} className="grid taskBox gap-2">
                      <div className="grid taskBoxHead">
                        <button type="button" className="taskTitle">
                          {req.title}
                        </button>
                        <span aria-hidden>🗎</span>
                      </div>

                      <div className="grid chips cols-2 gap-2">
                        <div className="chip">
                          <span aria-hidden>📅</span>
                          <span>{req.date}</span>
                        </div>
                        <div className="chip">
                          <span aria-hidden>📍</span>
                          <span>{req.location}</span>
                        </div>
                      </div>

                      <div className="grid chips cols-2 gap-2">
                        <div className="chip">
                          <span aria-hidden>•</span>
                          <span>{req.status}</span>
                        </div>
                        <div className="chip">
                          <span aria-hidden>🏢</span>
                          <span>{req.origin}</span>
                        </div>
                      </div>

                      <div className="grid taskActions cols-2 gap-2">
                        <button type="button" className="secondaryBtn">
                          פרטי הבקשה
                        </button>
                        <button type="button" className="primaryBtn">
                          עריכת הבקשה
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  className="grid ghostBtn flow-col items-center"
                >
                  <span>לכל הבקשות שלי</span>
                  <span aria-hidden>✏️</span>
                </button>
              </section>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
