import { FormEvent, ReactNode } from "react";
import Button from "../../../../components/button/button";
import { RequestFormData } from "../UserRequestPage";
import {
  City,
  District,
  DistrictId,
} from "../../../../services/RequestPage/UserRequestPage.service";

type Props = {
  t: (key: string) => string;
  isHebrew: boolean;
  form: RequestFormData;
  onUpdateField: <K extends keyof RequestFormData>(
    field: K,
    value: RequestFormData[K]
  ) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  districts: District[];
  selectedDistrict: District | null;
  getCitiesByDistrict: (id: DistrictId | "") => City[];
  renderProgressDots: () => ReactNode;
};

export function Step2Location({
  t,
  isHebrew,
  form,
  onUpdateField,
  onNextStep,
  onPreviousStep,
  districts,
  selectedDistrict,
  getCitiesByDistrict,
  renderProgressDots,
}: Props) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onNextStep();
  }

  return (
    <section className="request-step">
      <h2 className="request-step__title">{t("userRequest.step2.title")}</h2>

      <form onSubmit={handleSubmit} className="request-form">
        <div className="request-field request-field--half">
          <label className="request-label">
            {t("userRequest.step2.districtLabel")}{" "}
            <span className="request-label__required">*</span>
          </label>
          <select
            className="request-input"
            value={form.district}
            onChange={(event) =>
              onUpdateField("district", event.target.value as DistrictId | "")
            }
            required
          >
            <option value="">
              {t("userRequest.step2.districtPlaceholder")}
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {isHebrew ? district.nameHe : district.nameEn}
              </option>
            ))}
          </select>
        </div>

        <div className="request-field request-field--half">
          <label className="request-label">
            {t("userRequest.step2.cityLabel")}{" "}
            <span className="request-label__required">*</span>
          </label>
          <select
            className="request-input"
            value={form.city}
            onChange={(event) => onUpdateField("city", event.target.value)}
            disabled={!selectedDistrict}
            required
          >
            <option value="">
              {selectedDistrict
                ? t("userRequest.step2.cityPlaceholder")
                : t("userRequest.step2.chooseDistrictFirst")}
            </option>
            {getCitiesByDistrict(form.district).map((city) => (
              <option key={city.id} value={city.id}>
                {isHebrew ? city.nameHe : city.nameEn}
              </option>
            ))}
          </select>
        </div>

        <div className="request-field">
          <label className="request-label">
            {t("userRequest.step2.streetLabel")}
          </label>
          <input
            className="request-input"
            type="text"
            value={form.street}
            onChange={(event) => onUpdateField("street", event.target.value)}
            placeholder={t("userRequest.step2.streetPlaceholder")}
          />
        </div>

        <p className="request-hint">{t("userRequest.step2.hint")}</p>

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
