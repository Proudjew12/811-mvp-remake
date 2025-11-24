import "../styles/base.scss"

export default function Login() {
  return (
    <div className="login-page">

      <button className="lang-btn">עברית</button>

      <div className="login-card">
        <h2>ברוכים הבאים</h2>

        <img
          src="/logo.png"
          className="login-logo"
          alt="logo"
        />

        <input
          type="text"
          placeholder="הזן את הדוא״ל שלך"
        />

        <input
          type="password"
          placeholder="הזן את הסיסמה שלך"
        />

        <button className="login-btn">התחברות</button>

        <hr />

        <h4>Demo Accounts</h4>

        <div className="demo-buttons">
          <button>organization</button>
          <button>admin</button>
          <button>requester</button>
        </div>
      </div>
    </div>
  )
}
