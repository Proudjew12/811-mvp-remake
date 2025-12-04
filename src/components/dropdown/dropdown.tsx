import { ChangeEvent } from "react";
import "./dropdown.scss";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  options: Option[];
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  dir?: "ltr" | "rtl";
  className?: string;
};

export default function Dropdown({
  id,
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
  required,
  disabled,
  error,
  helperText,
  dir,
  className = "",
}: DropdownProps) {
  const errorId = error ? `${id || name}-error` : undefined;
  const helperId = helperText ? `${id || name}-helper` : undefined;

  return (
    <div
      className={`ui-dropdown ${
        error ? "ui-dropdown--error" : ""
      } ${className}`.trim()}
    >
      {label && (
        <label className="ui-dropdown__label" htmlFor={id || name}>
          {label}
          {required && <span className="ui-dropdown__required">*</span>}
        </label>
      )}

      <div className="ui-dropdown__control">
        <select
          id={id || name}
          name={name}
          className="ui-dropdown__select"
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          dir={dir}
          aria-invalid={!!error || undefined}
          aria-describedby={
            [errorId, helperId].filter(Boolean).join(" ") || undefined
          }
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="ui-dropdown__icon" aria-hidden="true">
          ▾
        </span>
      </div>

      {helperText && !error && (
        <p id={helperId} className="ui-dropdown__helper">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="ui-dropdown__error">
          {error}
        </p>
      )}
    </div>
  );
}
