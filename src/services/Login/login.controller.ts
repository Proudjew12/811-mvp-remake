// src/pages/Login/login.controller.ts

import { FormEvent, useState } from "react";
import {
  authService,
  DemoAccountKey,
  LoginCredentials,
} from "../../services/Login/login.service";

export function useLoginController() {
  const [creds, setCreds] = useState<LoginCredentials>(
    authService.getEmptyCreds()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onChangeField(field: keyof LoginCredentials, value: string) {
    setCreds((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError(null);

    const validationError = authService.validateCredentials(creds);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      await authService.login(creds);

      // TODO: navigate on success
      // navigate("/dashboard");
    } catch (err) {
      setError(authService.getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  function onSelectDemo(key: DemoAccountKey) {
    const demoCreds = authService.getDemoCredentials(key);
    if (!demoCreds) return;
    setCreds(demoCreds);
    setError(null);
  }

  return {
    creds,
    isSubmitting,
    error,
    onChangeField,
    onSubmit,
    onSelectDemo,
  };
}
