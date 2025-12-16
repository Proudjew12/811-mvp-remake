import { ChangeEvent } from "react";
import "./dropdown.scss";

export type Option = {
  value: string;
  label: string;
};

export type DropdownProps = {
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

export function Dropdown({
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
  const baseId = id || name;
  const errorId = error && baseId ? `${baseId}-error` : undefined;
  const helperId = helperText && baseId ? `${baseId}-helper` : undefined;

  return (
    <div
      className={["dropdown", error ? "is-error" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <label className="dropdown-label" htmlFor={baseId}>
          {label}
          {required && <span className="dropdown-required">*</span>}
        </label>
      )}

      <div className="dropdown-control">
        <select
          id={baseId}
          name={name}
          className="dropdown-select"
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

        <span className="dropdown-icon" aria-hidden="true">
          ▾
        </span>
      </div>

      {helperText && !error && (
        <p id={helperId} className="dropdown-helper" aria-live="polite">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="dropdown-error" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
}

export default Dropdown;
