import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./Login.scss";

import logoGreen from "@assets/Logo/mate-logo-green.png";
import { Button } from "@components/button/button";
import { showWelcomeToast } from "@services/notifications/alerts.service";
import {
  loginService,
  type DemoAccountKey,
  type LoginCredentials,
} from "@services/login/login.service";
import { loginUtils } from "@utils/login/login-utils";

export default function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [credentials, setCredentials] = useState<LoginCredentials>(
    loginService.getEmptyCredentials()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isHebrew = loginUtils.isHebrewLanguage(i18n.language);
  const dir = loginUtils.getDir(i18n.language);

  const demoAccounts = useMemo(() => loginService.getDemoAccounts(), []);

  function onLanguageToggle() {
    const nextLanguage = loginUtils.getNextLanguage(i18n.language);
    i18n.changeLanguage(nextLanguage);
  }

  function onChangeField<K extends keyof LoginCredentials>(key: K) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) =>
        loginUtils.setCredential(prev, key, event.target.value)
      );
      setErrorMessage(null);
    };
  }

  async function onLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      setIsSubmitting(true);

      const { loginResult, redirectPath, lang } =
        await loginService.runLoginFlow(credentials, i18n.language);

      showWelcomeToast(loginResult.email, lang);
      navigate(redirectPath);
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
    <div className="login-page grid place-center" dir={dir}>
      <Button
        className="lang-btn"
        type="button"
        variant="secondary"
        size="sm"
        onClick={onLanguageToggle}
      >
        {isHebrew
          ? t("languageSwitcher.hebrew")
          : t("languageSwitcher.english")}
      </Button>

      <div className="login-card grid place-center gap-3 text-center">
        <img
          src={logoGreen}
          className="login-logo"
          alt="לוגו מטה החיילים הארצי"
        />

        <form onSubmit={onLoginSubmit} className="grid gap-3 full-width">
          <input
            type="email"
            placeholder={t("forms.emailPlaceholder")}
            value={credentials.email}
            onChange={onChangeField("email")}
            autoComplete="email"
          />

          <input
            type="password"
            placeholder={t("forms.passwordPlaceholder")}
            value={credentials.password}
            onChange={onChangeField("password")}
            autoComplete="current-password"
          />

          {errorMessage && <p className="login-error">{errorMessage}</p>}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
          >
            {isSubmitting ? t("common.loading") : t("common.login")}
          </Button>
        </form>

        <hr />

        <p className="demo-title">Demo Accounts</p>

        <div className="demo-buttons grid flow-col place-center gap-3">
          {demoAccounts.map((acc) => (
            <Button
              key={acc.key}
              type="button"
              variant="secondary"
              onClick={() => onDemoAccountClick(acc.key)}
            >
              {acc.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
