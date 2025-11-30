import { FormEvent, ReactNode } from "react";
import Button from "../../../../components/button/button";
import { RequestFormData } from "../UserRequestPage";

type Props = {
  t: (key: string) => string;
  isHebrew: boolean;
  form: RequestFormData;
  onUpdateField: <K extends keyof RequestFormData>(
    field: K,
    value: RequestFormData[K]
  ) => void;
  onNextStep: () => void;
  onNavigateHome: () => void;
  renderProgressDots: () => ReactNode;
  sanitizePhoneInput: (value: string) => string;
};

export function Step1BasicInfo({
  t,
  isHebrew,
  form,
  onUpdateField,
  onNextStep,
  onNavigateHome,
  renderProgressDots,
  sanitizePhoneInput,
}: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNextStep();
  }

  return (
    <section className="request-step">
      <h2 className="request-step__title">{t("userRequest.step1.title")}</h2>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="request-field">
          <label className="request-label">
            {t("userRequest.step1.recipientNameLabel")}{" "}
            <span className="request-label__required">*</span>
          </label>
          <input
            className="request-input"
            type="text"
            value={form.recipientName}
            onChange={(event) =>
              onUpdateField("recipientName", event.target.value)
            }
            placeholder={t("userRequest.step1.recipientNamePlaceholder")}
            required
          />
        </div>

        <div className="request-field">
          <label className="request-label">
            {t("userRequest.step1.phoneLabel")}{" "}
            <span className="request-label__required">*</span>
          </label>
          <input
            className={
              "request-input request-input--phone" +
              (!isHebrew ? " request-input--ltr" : "")
            }
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={form.recipientPhone}
            onChange={(event) => {
              const digitsOnly = sanitizePhoneInput(event.target.value);
              onUpdateField("recipientPhone", digitsOnly);
            }}
            placeholder={t("userRequest.step1.phonePlaceholder")}
            required
          />
        </div>

        <div className="request-field">
          <label className="request-label">
            {t("userRequest.step1.requestTitleLabel")}{" "}
            <span className="request-label__required">*</span>
          </label>
          <input
            className="request-input"
            type="text"
            value={form.requestTitle}
            onChange={(event) =>
              onUpdateField("requestTitle", event.target.value)
            }
            placeholder={t("userRequest.step1.requestTitlePlaceholder")}
            required
          />
        </div>

        <p className="request-hint">{t("userRequest.step1.hint")}</p>

        <footer className="request-step-footer flex">
          <Button type="button" variant="secondary" onClick={onNavigateHome}>
            {t("userRequest.backToHome")}
          </Button>

          {renderProgressDots()}

          <Button type="submit" variant="primary">
            {t("footer.next")} →
          </Button>
        </footer>
      </form>
    </section>
  );
}
