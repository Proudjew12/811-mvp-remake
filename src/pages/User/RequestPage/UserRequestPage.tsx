import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@components/button/button";
import { Card } from "@components/card/card";
import { Title } from "@components/title/title";

import "@pages/User/RequestPage/UserRequestPage.scss";
import "@pages/User/RequestPage/Steps/Steps.scss";

import {
  RequestForm,
  type RequestStepKey,
  userRequestStepsService,
} from "@services/dashboard/user-request-page/steps";

import Step1 from "@pages/User/RequestPage/Steps/Step-1";
import Step2 from "@pages/User/RequestPage/Steps/Step-2";
import Step3 from "@pages/User/RequestPage/Steps/Step-3";
import Step4 from "@pages/User/RequestPage/Steps/Step-4";
import Step5 from "@pages/User/RequestPage/Steps/Step-5";
import Step6 from "@pages/User/RequestPage/Steps/Step-6";
import Step7 from "@pages/User/RequestPage/Steps/Step-7";
import Step8 from "@pages/User/RequestPage/Steps/Step-8";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isPhoneValid(phoneRaw: string) {
  const d = onlyDigits(phoneRaw);
  return d.length >= 8 && d.length <= 10;
}

function isStepValid(stepKey: RequestStepKey, form: RequestForm) {
  switch (stepKey) {
    case "who":
      return (
        form.requestTitle.trim().length > 0 &&
        form.receiverName.trim().length > 0 &&
        isPhoneValid(form.phone)
      );

    case "scope": {
      const peopleOk = onlyDigits(form.helpedPeopleCount).length > 0;
      const volunteersOk =
        form.volunteersNeeded.trim().length === 0 ||
        onlyDigits(form.volunteersNeeded).length > 0;
      const urgencyOk = form.urgency.trim().length > 0;
      return peopleOk && volunteersOk && urgencyOk;
    }

    case "location":
      return (
        form.area.trim().length > 0 &&
        form.city.trim().length > 0 &&
        form.street.trim().length > 0
      );

    case "time":
      return (
        form.startDate.trim().length > 0 &&
        form.startTime.trim().length > 0 &&
        form.endDate.trim().length > 0 &&
        form.endTime.trim().length > 0
      );

    case "type":
      return form.assistanceTypes.length > 0;

    case "extra":
      return form.aidDomain.trim().length > 0 && form.needsTransport !== "";

    case "more":
      return true;

    case "summary":
      return true;

    default:
      return true;
  }
}

export default function UserRequestPage() {
  const navigate = useNavigate();

  const steps = useMemo(() => userRequestStepsService.getSteps(), []);
  const totalSteps = steps.length;

  const [stepIdx, setStepIdx] = useState(0);
  const [showErrors, setShowErrors] = useState(false);

  const [form, setForm] = useState<RequestForm>(
    userRequestStepsService.getEmptyForm()
  );

  const step = steps[stepIdx];
  const isFirst = stepIdx === 0;
  const isLast = stepIdx === totalSteps - 1;

  const canGoNext = isStepValid(step.key, form);

  useEffect(() => {
    setShowErrors(false);
  }, [stepIdx]);

  function updateField<K extends keyof RequestForm>(
    key: K,
    value: RequestForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAssistanceType(value: string) {
    setForm((prev) => {
      const exists = prev.assistanceTypes.includes(value);
      const next = exists
        ? prev.assistanceTypes.filter((v) => v !== value)
        : [...prev.assistanceTypes, value];
      return { ...prev, assistanceTypes: next };
    });
  }

  function onClose() {
    navigate("/user/dashboard");
  }

  function goNext() {
    if (isLast) return;

    if (!canGoNext) {
      setShowErrors(true);
      return;
    }

    setStepIdx((prev) => Math.min(prev + 1, totalSteps - 1));
  }

  function goBack() {
    setStepIdx((prev) => Math.max(prev - 1, 0));
  }

  function submit() {
    navigate("/user/dashboard");
  }

  // ✅ DEV SKIP (ignores validation)
  function devSkip() {
    setShowErrors(false);
    setStepIdx((prev) => Math.min(prev + 1, totalSteps - 1));
  }

  return (
    <section className="request-page full-height overflow-hidden" dir="ltr">
      <main
        className="request-page-main full-height min-0 overflow-hidden grid place-center"
        dir="ltr"
      >
        <div className="request-page-shell full-width min-0" dir="ltr">
          <Card variant="solid" className="request-card full-width min-0">
            <div
              className="request-card-inner full min-0 grid request-card-grid"
              dir="rtl"
            >
              <button
                type="button"
                className="request-close"
                onClick={onClose}
                aria-label="סגירה"
                title="סגירה"
              >
                ×
              </button>

              <div className="request-top grid gap-2" dir="rtl">
                <Title level={2} variant="page" className="request-title">
                  טופס הגשת בקשת סיוע
                </Title>

                <div className="request-stephead grid gap-2">
                  <Title level={3} variant="section" className="text-center">
                    {step.title}
                  </Title>

                  {step.subtitle && (
                    <div className="request-subtitle text-muted text-center">
                      {step.subtitle}
                    </div>
                  )}
                </div>
              </div>

              <div className="request-body min-0 overflow-auto">
                <div
                  className={[
                    "request-stepwrap",
                    step.key === "summary" ? "is-wide" : "",
                  ].join(" ")}
                >
                  {step.key === "who" && (
                    <Step1
                      form={form}
                      updateField={updateField}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "scope" && (
                    <Step2
                      form={form}
                      updateField={updateField}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "location" && (
                    <Step3
                      form={form}
                      updateField={updateField}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "time" && (
                    <Step4
                      form={form}
                      updateField={updateField}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "type" && (
                    <Step5
                      form={form}
                      toggleAssistanceType={toggleAssistanceType}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "extra" && (
                    <Step6
                      form={form}
                      updateField={updateField}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "more" && (
                    <Step7
                      form={form}
                      updateField={updateField}
                      showErrors={showErrors}
                    />
                  )}

                  {step.key === "summary" && (
                    <Step8 form={form} updateField={updateField} />
                  )}
                </div>
              </div>

              <div
                className="request-footer grid items-center request-footer-grid"
                dir="ltr"
              >
                <div className="request-footer-left" dir="rtl">
                  {isLast ? (
                    <Button variant="secondary" size="lg" onClick={submit}>
                      שליחת הבקשה למוקד
                    </Button>
                  ) : (
                    !isFirst && (
                      <Button variant="secondary" size="lg" onClick={goBack}>
                        קודם
                      </Button>
                    )
                  )}
                </div>

                <div className="request-footer-center" dir="rtl">
                  <ul className="clean-list request-dots-inline grid flow-col gap-2">
                    {steps.map((s, idx) => {
                      const isActive = idx === stepIdx;
                      return (
                        <li key={s.key}>
                          <span
                            className={[
                              "request-dot",
                              isActive ? "is-active" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            aria-label={`שלב ${idx + 1}`}
                            role="img"
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="request-footer-right" dir="rtl">
                  {isLast ? (
                    <Button variant="secondary" size="lg" onClick={goBack}>
                      קודם
                    </Button>
                  ) : (
                    <Button variant="secondary" size="lg" onClick={goNext}>
                      המשך
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* ✅ Outside the frame (below the Card) */}
          <div className="request-devskip-row" dir="ltr">
            <button
              type="button"
              className="request-devskip-btn"
              onClick={devSkip}
            >
              devSkip
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
