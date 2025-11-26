import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import logoGreen from "../../assets/Logo/mate-logo-green.png";
import Button from "../../components/button/button";
import {
  loginService,
  DemoAccountKey,
  LoginCredentials,
  LoginResult,
} from "../../services/Login/login.service";

export default function Login() {
  const navigate = useNavigate();

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

  function navigateByAccountType(result: LoginResult) {
    switch (result.accountType) {
      case "organization":
        navigate("/home");
        break;
      case "admin":
        navigate("/home");
        break;
      case "requester":
        navigate("/home");
        break;
    }
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
      const loginResult = await loginService.login(credentials);
      navigateByAccountType(loginResult);
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
      <Button className="lang-btn" type="button" variant="secondary">
        עברית
      </Button>

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

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? "מתחבר..." : "התחברות"}
          </Button>
        </form>

        <hr />

        <p className="demo-title">Demo Accounts</p>

        <div className="demo-buttons flex center gap-16">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onDemoAccountClick("organization")}
          >
            organization
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => onDemoAccountClick("admin")}
          >
            admin
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => onDemoAccountClick("requester")}
          >
            requester
          </Button>
        </div>
      </div>
    </div>
  );
}
