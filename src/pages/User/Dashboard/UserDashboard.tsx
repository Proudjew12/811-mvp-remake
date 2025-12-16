import { DashboardHeader } from "@components/dashboard-header/dashboard-header";

import "./UserDashboard.scss";

export default function UserDashboard() {
  return (
    <section className="user-dashboard main-layout full-height overflow-hidden grid">
      <header className="user-dashboard-header full">
        <DashboardHeader userName="דנה לוי" />
      </header>
    </section>
  );
}
