import { useMemo } from "react";
import { Dropdown } from "@components/dropdown/dropdown";
import { Title } from "@components/title/title";
import {
  RequestForm,
  userRequestStepsService,
} from "@services/dashboard/user-request-page/steps";

type Props = {
  form: RequestForm;
  updateField: <K extends keyof RequestForm>(
    key: K,
    value: RequestForm[K]
  ) => void;
  showErrors?: boolean;
};

function mergeFiles(prev: File[], next: File[]) {
  const all = [...prev];
  for (const f of next) {
    const exists = all.some(
      (p) =>
        p.name === f.name &&
        p.size === f.size &&
        p.lastModified === f.lastModified
    );
    if (!exists) all.push(f);
  }
  return all;
}

export default function Step6({ form, updateField, showErrors }: Props) {
  const domains = userRequestStepsService.getAidDomainOptions();

  const filePills = useMemo(() => {
    return form.attachments.map((f) => ({
      key: `${f.name}-${f.size}-${f.lastModified}`,
      name: f.name,
    }));
  }, [form.attachments]);

  function onFilesChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    updateField("attachments", mergeFiles(form.attachments, Array.from(files)));
  }

  function removeFileByKey(key: string) {
    const next = form.attachments.filter(
      (f) => `${f.name}-${f.size}-${f.lastModified}` !== key
    );
    updateField("attachments", next);
  }

  return (
    <div className="request-steps grid gap-4" dir="rtl">
      <div className="grid gap-2">
        <Title level={4} variant="label">
          תחומי סיוע
        </Title>

        <Dropdown
          value={form.aidDomain}
          onChange={(e) => updateField("aidDomain", e.target.value)}
          options={domains}
          placeholder="התחילו/הקלידו או לבחור מהרשימה..."
          dir="rtl"
          error={showErrors && !form.aidDomain ? "שכחת למלא פה" : undefined}
        />
      </div>

      <div className="grid gap-2">
        <Title level={4} variant="label">
          נדרש שינוע?
        </Title>

        <div className="grid flow-col gap-2 request-toggle-row" dir="ltr">
          <button
            type="button"
            className={[
              "btn",
              form.needsTransport === "yes" ? "btn-primary" : "btn-secondary",
            ].join(" ")}
            onClick={() => updateField("needsTransport", "yes")}
          >
            כן, נדרש שינוע
          </button>

          <button
            type="button"
            className={[
              "btn",
              form.needsTransport === "no" ? "btn-primary" : "btn-secondary",
            ].join(" ")}
            onClick={() => updateField("needsTransport", "no")}
          >
            לא, אין צורך
          </button>
        </div>

        {showErrors && form.needsTransport === "" && (
          <p className="field-error">שכחת לבחור פה</p>
        )}
      </div>

      <div className="grid gap-2">
        <input
          id="request-attachments-step6"
          className="sr-only"
          type="file"
          multiple
          onChange={(e) => onFilesChange(e.target.files)}
        />

        <label
          htmlFor="request-attachments-step6"
          className="request-upload-box grid place-center gap-2 clickable"
        >
          <span className="request-upload-icon" aria-hidden="true">
            ⬆
          </span>

          <div className="request-upload-title">
            העלאת קבצים / תמונות רלוונטיות
          </div>
          <div className="request-upload-hint text-muted">
            לא חובה, אבל יכול לעזור למח&quot;ל להבין את המצב בשטח.
          </div>
        </label>

        {filePills.length > 0 && (
          <ul className="clean-list request-file-pills grid gap-2">
            {filePills.map((f) => (
              <li key={f.key} className="request-file-pill grid flow-col gap-2">
                <span className="truncate" title={f.name}>
                  {f.name}
                </span>

                <button
                  type="button"
                  className="request-file-remove"
                  onClick={() => removeFileByKey(f.key)}
                  aria-label="הסרה"
                  title="הסרה"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
