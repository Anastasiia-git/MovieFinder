import { ChevronDown } from "lucide-react";
import s from "./MoviesPage.module.css";

function FilterDropdown({
  label,
  value,
  Icon,
  isOpen,
  isDisabled = false,
  onToggle,
  children,
}) {
  return (
    <div className={s.fieldGroup}>
      <span className={s.label}>{label}</span>
      <div className={s.pickerControl}>
        <button
          className={`${s.field} ${s.pickerButton}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          disabled={isDisabled}
        >
          <Icon className={s.fieldIcon} size={18} aria-hidden="true" />
          <span>{value}</span>
          <ChevronDown className={s.chevron} size={20} aria-hidden="true" />
        </button>

        {isOpen && (
          <div className={s.dropdown}>
            <div className={s.optionList}>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterDropdown;
