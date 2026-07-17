import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

import SelectItem from "./SelectItem";

type SelectOption = {
  label: string;
  value: string;
  color?: string;
};

type CustomSelectProps = {
  label: string;
  placeholder?: string;
  value?: string;
  options: readonly SelectOption[];
  onValueChange: (value: string) => void;
  error?: string;
};

export default function CustomSelect({
  label,
  placeholder = "Select option",
  value,
  options,
  onValueChange,
  error,
}: CustomSelectProps) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          className={`
            flex h-11 items-center justify-between rounded-xl border cursor-pointer
            px-3 text-sm outline-none transition
            focus:ring-2 focus:ring-blue-500
            ${error ? "border-red-400" : "border-gray-200"}
          `}
        >
          <div className="flex items-center gap-2">
            {selectedOption?.color && (
              <span
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: selectedOption.color }}
              />
            )}

            <Select.Value placeholder={placeholder} />
          </div>
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden z-50 rounded-xl border border-gray-200 bg-white shadow-lg"
            position="popper"
          >
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  color={option.color}
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
