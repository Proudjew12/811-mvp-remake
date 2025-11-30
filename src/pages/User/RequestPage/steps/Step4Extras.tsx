import { ChangeEvent, FormEvent, ReactNode } from "react";
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
  onFilesSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  renderProgressDots: () => ReactNode;
};

export function Step4Extras({
  t,
  form,
  onUpdateField,
  onPreviousStep,
  onNextStep,
  onFilesSelected,
  renderProgressDots,
}: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNextStep();
  }

  return (
    <section className="request-step">
      <h2 className="request-step__title">{t("userRequest.step4.title")}</h2>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="request-toggle-group">
          <span className="request-toggle-group__label">
            {t("userRequest.step4.transportQuestion")}
          </span>
          <div className="request-toggle-group__buttons flex">
            <Button
              type="button"
              variant={form.needsTransport === false ? "primary" : "secondary"}
              onClick={() => onUpdateField("needsTransport", false)}
            >
              {t("userRequest.step4.transportNo")}
            </Button>
            <Button
              type="button"
              variant={form.needsTransport === true ? "primary" : "secondary"}
              onClick={() => onUpdateField("needsTransport", true)}
            >
              {t("userRequest.step4.transportYes")}
            </Button>
          </div>
        </div>

        <div className="request-toggle-group">
          <span className="request-toggle-group__label">
            {t("userRequest.step4.volunteersQuestion")}
          </span>
          <div className="request-toggle-group__buttons flex">
            <Button
              type="button"
              variant={form.needsVolunteers === false ? "primary" : "secondary"}
              onClick={() => onUpdateField("needsVolunteers", false)}
            >
              {t("userRequest.step4.volunteersNo")}
            </Button>
            <Button
              type="button"
              variant={form.needsVolunteers === true ? "primary" : "secondary"}
              onClick={() => onUpdateField("needsVolunteers", true)}
            >
              {t("userRequest.step4.volunteersYes")}
            </Button>
          </div>
        </div>

        <div className="request-upload">
          <p className="request-upload__label">
            {t("userRequest.step4.uploadLabel")}
          </p>
          <label className="request-upload__dropzone flex center">
            <span className="request-upload__hint">
              {t("userRequest.step4.uploadPlaceholder")}
            </span>
            <input type="file" multiple onChange={onFilesSelected} hidden />
          </label>

          {form.attachments.length > 0 && (
            <ul className="request-upload__list clean-list">
              {form.attachments.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

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
