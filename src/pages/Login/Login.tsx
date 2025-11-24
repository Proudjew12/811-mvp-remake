import "./login.scss";
import logoGreen from "../../assets/Logo/mate-logo-green.png";
import { useLoginController } from "../../services/Login/login.controller";

export default function Login() {
  const {
    creds,
    isSubmitting,
    error,
    onChangeField,
    onSubmit,
    onSelectDemo,
  } = useLoginController();

  return (
    <div className="login-page flex column center">
      <button className="lang-btn" type="button">
        עברית
      </button>

      <div className="login-card flex column center">
        <h2>ברוכים הבאים</h2>

        <img
          src={logoGreen}
          className="login-logo"
          alt="לוגו מטה החיילים הארצי"
        />

        <form onSubmit={onSubmit} className="flex column center">
          <input
            type="email"
            placeholder="הזן את הדוא״ל שלך"
            value={creds.email}
            onChange={(e) => onChangeField("email", e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="הזן את הסיסמה שלך"
            value={creds.password}
            onChange={(e) => onChangeField("password", e.target.value)}
            autoComplete="current-password"
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "מתחבר..." : "התחברות"}
          </button>
        </form>

        <hr />

        <p className="demo-title">Demo Accounts</p>

        <div className="demo-buttons flex center gap-16">
          <button
            type="button"
            onClick={() => onSelectDemo("organization")}
          >
            organization
          </button>
          <button type="button" onClick={() => onSelectDemo("admin")}>
            admin
          </button>
          <button type="button" onClick={() => onSelectDemo("requester")}>
            requester
          </button>
        </div>
      </div>
    </div>
  );
}
