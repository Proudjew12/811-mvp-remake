import "./Login/login.scss";
import logoGreen from "../assets/Logo/mate-logo-green.png";

export default function Login() {
  return (
    <div className="login-page flex column center">

      <button className="lang-btn">עברית</button>

      <div className="login-card flex column center">

        <h2>ברוכים הבאים</h2>

        <img src={logoGreen} className="login-logo" />

        <input type="text" placeholder="הזן את הדוא״ל שלך" />
        <input type="password" placeholder="הזן את הסיסמה שלך" />

        <button className="login-btn">התחברות</button>

        <hr />

        <p className="demo-title">Demo Accounts</p>

        <div className="demo-buttons flex center gap-16">
          <button>organization</button>
          <button>admin</button>
          <button>requester</button>
        </div>

      </div>
    </div>
  )
}
