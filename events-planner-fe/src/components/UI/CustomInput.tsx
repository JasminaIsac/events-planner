import { forwardRef } from "react";

import type { ComponentPropsWithoutRef } from "react";

type CustomInputProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, id, className = "", ...inputProps }, ref) => {
    const inputId = id ?? inputProps.name;
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
          w-full rounded-lg border px-3 py-2 text-sm outline-none transition
          placeholder:text-gray-400
          focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-400" : "border-gray-300"}
          ${className}
        `}
          {...inputProps}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
