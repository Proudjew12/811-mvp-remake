import { ChangeEvent, FormEvent, useState } from "react";
import "./login.scss";
import logoGreen from "../../assets/Logo/mate-logo-green.png";
import {
  loginService,
  DemoAccountKey,
  LoginCredentials,
} from "../../services/Login/login.service";

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>(
    loginService.getEmptyCredentials()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      email: value,
    }));

    if (errorMessage) setErrorMessage(null);
  }

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setCredentials((previousCredentials) => ({
      ...previousCredentials,
      password: value,
    }));

    if (errorMessage) setErrorMessage(null);
  }

  async function onLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const validationError = loginService.validateCredentials(credentials);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      await loginService.login(credentials);
      // TODO: navigate to next route on successful login
    } catch (error) {
      setErrorMessage(loginService.getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  function onDemoAccountClick(accountType: DemoAccountKey) {
    const demoCredentials = loginService.getDemoCredentials(accountType);
    if (!demoCredentials) return;

    setCredentials(demoCredentials);
    setErrorMessage(null);
  }

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

        <form onSubmit={onLoginSubmit} className="flex column center">
          <input
            type="email"
            placeholder="הזן את הדוא״ל שלך"
            value={credentials.email}
            onChange={onEmailChange}
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="הזן את הסיסמה שלך"
            value={credentials.password}
            onChange={onPasswordChange}
            autoComplete="current-password"
          />

          {errorMessage && <p className="login-error">{errorMessage}</p>}

          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "מתחבר..." : "התחברות"}
          </button>
        </form>

        <hr />

        <p className="demo-title">Demo Accounts</p>

        <div className="demo-buttons flex center gap-16">
          <button
            type="button"
            onClick={() => onDemoAccountClick("organization")}
          >
            organization
          </button>
          <button
            type="button"
            onClick={() => onDemoAccountClick("admin")}
          >
            admin
          </button>
          <button
            type="button"
            onClick={() => onDemoAccountClick("requester")}
          >
            requester
          </button>
        </div>
      </div>
    </div>
  );
}
