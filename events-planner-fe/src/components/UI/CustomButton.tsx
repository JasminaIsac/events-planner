import { forwardRef } from "react";

import type { ButtonSize, ButtonVariant } from "~/config/styleConstants";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "~/config/styleConstants";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type CustomButtonProps = {
  title?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyles = `
  inline-flex items-center justify-center gap-2
  rounded-lg text-sm font-medium
  transition-colors duration-200 cursor-pointer
  disabled:cursor-not-allowed disabled:opacity-50
`;

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      title,
      icon,
      variant = BUTTON_VARIANTS.SOLID.value,
      size = BUTTON_SIZES.MD.value,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantStyle = Object.values(BUTTON_VARIANTS).find(
      (v) => v.value === variant,
    )?.style;

    const sizeStyle = Object.values(BUTTON_SIZES).find(
      (s) => s.value === size,
    )?.style;

    return (
      <button
        ref={ref}
        type="button"
        className={`
          ${baseStyles}
          ${variantStyle}
          ${sizeStyle}
          ${className}
        `}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}

        {title && <span>{title}</span>}
      </button>
    );
  },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
