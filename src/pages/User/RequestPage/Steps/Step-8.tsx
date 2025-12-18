import { useMemo } from "react";
import {
  RequestForm,
  userRequestStepsService,
} from "@/services/user/user-request-page/steps";

type Props = {
  form: RequestForm;
  updateField: <K extends keyof RequestForm>(
    key: K,
    value: RequestForm[K]
  ) => void;
};

function labelFromValue(
  options: { value: string; label: string }[],
  value: string
) {
  return options.find((o) => o.value === value)?.label ?? "";
}

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

export default function Step8({ form, updateField }: Props) {
  const urgencyLabel = useMemo(
    () =>
      labelFromValue(userRequestStepsService.getUrgencyOptions(), form.urgency),
    [form.urgency]
  );

  const aidDomainLabel = useMemo(
    () =>
      labelFromValue(
        userRequestStepsService.getAidDomainOptions(),
        form.aidDomain
      ),
    [form.aidDomain]
  );

  const assistanceLabels = useMemo(() => {
    const map = new Map(
      userRequestStepsService
        .getAssistanceTypeOptions()
        .map((o) => [o.value, o.label] as const)
    );
    return form.assistanceTypes.length
      ? form.assistanceTypes.map((v) => map.get(v) ?? v).join(", ")
      : "-";
  }, [form.assistanceTypes]);

  const transportLabel =
    form.needsTransport === "yes"
      ? "כן, נדרש שינוע"
      : form.needsTransport === "no"
      ? "לא, אין צורך"
      : "-";

  const filePills = useMemo(
    () =>
      form.attachments.map((f) => ({
        key: `${f.name}-${f.size}-${f.lastModified}`,
        name: f.name,
      })),
    [form.attachments]
  );

  function onFilesChange(files: FileList | null) {
    if (!files || files.length === 0) return;
    updateField("attachments", mergeFiles(form.attachments, Array.from(files)));
  }

  function removeFileByKey(key: string) {
    updateField(
      "attachments",
      form.attachments.filter(
        (f) => `${f.name}-${f.size}-${f.lastModified}` !== key
      )
    );
  }

  return (
    <div className="grid gap-4 request-summary-root" dir="rtl">
      <div className="grid cols-4 gap-4 request-summary-grid">
        <section className="request-summary-card">
          <span className="request-summary-edit" aria-hidden="true">
            ✎
          </span>
          <div className="request-summary-card-head">תחומי סיוע ושינוע</div>
          <div className="request-summary-card-body">
            <div>
              <b>תחומי הסיוע:</b> {aidDomainLabel || "-"}
            </div>
            <div>
              <b>נדרש שינוע:</b> {transportLabel}
            </div>
          </div>
        </section>

        <section className="request-summary-card">
          <span className="request-summary-edit" aria-hidden="true">
            ✎
          </span>
          <div className="request-summary-card-head">
            מה היקף הסיוע וכמה הוא דחוף?
          </div>
          <div className="request-summary-card-body">
            <div>
              <b>מספר אנשים מיועד:</b> {form.helpedPeopleCount || "-"}
            </div>
            <div>
              <b>מתנדבים:</b>{" "}
              {form.volunteersNeeded ? form.volunteersNeeded : "-"}
            </div>
            <div>
              <b>רמת הדחיפות:</b> {urgencyLabel || "-"}
            </div>
          </div>
        </section>

        <section className="request-summary-card">
          <span className="request-summary-edit" aria-hidden="true">
            ✎
          </span>
          <div className="request-summary-card-head">מי צריך עזרה?</div>
          <div className="request-summary-card-body">
            <div>
              <b>כותרת הבקשה:</b> {form.requestTitle || "-"}
            </div>
            <div>
              <b>שם מקבל הסיוע:</b> {form.receiverName || "-"}
            </div>
            <div>
              <b>טלפון ליצירת קשר:</b> {form.phone || "-"}
            </div>
          </div>
        </section>

        <section className="request-summary-card">
          <span className="request-summary-edit" aria-hidden="true">
            ✎
          </span>
          <div className="request-summary-card-head">לאיפה ומתי?</div>
          <div className="request-summary-card-body">
            <div>
              <b>אזור:</b> {form.area || "-"}, <b>קהילה:</b> {form.city || "-"}
            </div>
            <div>
              <b>כתובת:</b> {form.street || "-"}
            </div>
            <div>
              <b>טווח תאריכים:</b> {form.startDate || "-"}–{form.endDate || "-"}
            </div>
            <div>
              <b>טווח שעות:</b> {form.startTime || "-"}–{form.endTime || "-"}
            </div>
          </div>
        </section>

        <section className="request-summary-card request-span-2">
          <span className="request-summary-edit" aria-hidden="true">
            ✎
          </span>
          <div className="request-summary-card-head">קבצים שנוספו</div>

          <div className="request-summary-card-body">
            <div className="grid cols-2 request-files-inner">
              <div className="request-files-upload">
                <input
                  id="request-attachments-step8"
                  className="sr-only"
                  type="file"
                  multiple
                  onChange={(e) => onFilesChange(e.target.files)}
                />

                <label
                  htmlFor="request-attachments-step8"
                  className="grid place-center gap-2 request-files-uploadbox clickable"
                  dir="rtl"
                >
                  <div className="request-files-uploadtitle">העלאת קבצים</div>
                  <span className="request-upload-icon" aria-hidden="true">
                    ⬆
                  </span>
                </label>
              </div>

              <div className="request-files-list" dir="rtl">
                {filePills.length === 0 ? (
                  <div className="text-muted">לא נוספו קבצים.</div>
                ) : (
                  <ul className="clean-list grid gap-2 request-files-pills">
                    {filePills.map((f) => (
                      <li
                        key={f.key}
                        className="grid flow-col gap-2 request-file-pill"
                      >
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
          </div>
        </section>

        <section className="request-summary-card request-span-2">
          <span className="request-summary-edit" aria-hidden="true">
            ✎
          </span>
          <div className="request-summary-card-head">משהו נוסף?</div>
          <div className="request-summary-card-body">
            {form.moreInfo?.trim() ? form.moreInfo : "לא נוספו פרטים נוספים."}
          </div>
        </section>
      </div>

      <div className="request-summary-footnote text-muted" dir="rtl">
        סוגי סיוע: {assistanceLabels}
      </div>
    </div>
  );
}
