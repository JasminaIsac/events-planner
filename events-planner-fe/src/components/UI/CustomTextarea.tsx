import { forwardRef } from "react";

import type { ComponentPropsWithoutRef } from "react";

type CustomTextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  error?: string;
};

const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        <textarea
          ref={ref}
          id={textareaId}
          className={`
            min-h-24 resize-none rounded-lg border px-3 py-2
            text-sm outline-none transition
            placeholder:text-gray-400
            focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            ${error ? "border-red-400" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
