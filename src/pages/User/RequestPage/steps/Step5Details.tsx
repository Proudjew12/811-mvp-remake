import { FormEvent, ReactNode } from "react";
import Button from "../../../../components/button/button";
import { RequestFormData } from "../UserRequestPage";

type Props = {
  t: (key: string) => string;
  form: RequestFormData;
  onUpdateField: <K extends keyof RequestFormData>(
    field: K,
    value: RequestFormData[K]
  ) => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
  renderProgressDots: () => ReactNode;
};

export function Step5Details({
  t,
  form,
  onUpdateField,
  onPreviousStep,
  onNextStep,
  renderProgressDots,
}: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNextStep();
  }

  return (
    <section className="request-step">
      <h2 className="request-step__title">{t("userRequest.step5.title")}</h2>
      <h3 className="request-step__subtitle">
        {t("userRequest.step5.subtitle")}
      </h3>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="request-field">
          <label className="request-label">
            {t("userRequest.step5.requestTitleLabel")}
          </label>
          <input
            className="request-input"
            type="text"
            value={form.detailsTitle || form.requestTitle}
            onChange={(event) =>
              onUpdateField("detailsTitle", event.target.value)
            }
            placeholder={
              form.requestTitle || t("userRequest.step5.requestTitleLabel")
            }
          />
        </div>

        <div className="request-field">
          <label className="request-label">
            {t("userRequest.step5.descriptionLabel")}
          </label>
          <textarea
            className="request-textarea"
            value={form.detailsDescription}
            onChange={(event) =>
              onUpdateField("detailsDescription", event.target.value)
            }
            placeholder={t("userRequest.step5.descriptionPlaceholder")}
            rows={5}
          />
        </div>

        <p className="request-hint">{t("userRequest.step5.hint")}</p>

        <footer className="request-step-footer flex">
          <Button type="button" variant="secondary" onClick={onPreviousStep}>
            ← {t("footer.previous")}
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
