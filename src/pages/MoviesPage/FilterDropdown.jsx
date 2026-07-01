import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";
import s from "./MoviesPage.module.css";

function FilterDropdown({
  label,
  value,
  Icon,
  isOpen,
  isDisabled = false,
  onToggle,
  onClose = () => {},
  children,
}) {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const labelId = useId();
  const valueId = useId();
  const menuId = useId();

  const getOptions = useCallback(() =>
    Array.from(
      menuRef.current?.querySelectorAll('[role="menuitemradio"]') ?? [],
    ), []);

  const focusOption = useCallback((index) => {
    const options = getOptions();

    if (options.length === 0) {
      return;
    }

    const nextIndex = (index + options.length) % options.length;
    options[nextIndex].focus();
  }, [getOptions]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        buttonRef.current?.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const animationFrame = requestAnimationFrame(() => {
      const options = getOptions();
      const activeIndex = options.findIndex(
        (option) => option.getAttribute("aria-checked") === "true",
      );

      focusOption(activeIndex >= 0 ? activeIndex : 0);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [focusOption, getOptions, isOpen]);

  const handleMenuKeyDown = (event) => {
    const options = getOptions();
    const currentIndex = options.indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusOption(currentIndex + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusOption(currentIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusOption(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusOption(options.length - 1);
    }
  };

  return (
    <div className={s.fieldGroup} ref={dropdownRef}>
      <span className={s.label} id={labelId}>
        {label}
      </span>
      <div className={s.pickerControl}>
        <button
          ref={buttonRef}
          className={`${s.field} ${s.pickerButton}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          aria-haspopup="menu"
          aria-labelledby={`${labelId} ${valueId}`}
          disabled={isDisabled}
        >
          <Icon className={s.fieldIcon} size={18} aria-hidden="true" />
          <span id={valueId}>{value}</span>
          <ChevronDown className={s.chevron} size={20} aria-hidden="true" />
        </button>

        {isOpen && (
          <div className={s.dropdown}>
            <div
              className={s.optionList}
              id={menuId}
              role="menu"
              aria-labelledby={labelId}
              ref={menuRef}
              onKeyDown={handleMenuKeyDown}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterDropdown;
