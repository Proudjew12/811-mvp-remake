import { ChangeEvent, FormEvent, ReactNode } from "react";
import Button from "@components/button/button";
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
    <section className="grid request-step">
      <h2 className="request-step-title">{t("userRequest.step4.title")}</h2>

      <form onSubmit={handleSubmit} className="grid request-form">
        <div className="grid toggle-group">
          <span className="toggle-label">
            {t("userRequest.step4.transportQuestion")}
          </span>

          <div className="grid toggle-buttons">
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

        <div className="grid toggle-group">
          <span className="toggle-label">
            {t("userRequest.step4.volunteersQuestion")}
          </span>

          <div className="grid toggle-buttons">
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

        <div className="grid upload">
          <p className="upload-label">{t("userRequest.step4.uploadLabel")}</p>

          <label className="upload-dropzone">
            <span className="upload-hint">
              {t("userRequest.step4.uploadPlaceholder")}
            </span>
            <input type="file" multiple onChange={onFilesSelected} hidden />
          </label>

          {form.attachments.length > 0 && (
            <ul className="clean-list upload-list">
              {form.attachments.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <footer className="grid request-footer">
          <Button type="button" variant="secondary" onClick={onPreviousStep}>
            ← {t("footer.previous")}
          </Button>

          <div className="request-footer-center">{renderProgressDots()}</div>

          <Button type="submit" variant="primary">
            {t("footer.next")} →
          </Button>
        </footer>
      </form>
    </section>
  );
}
