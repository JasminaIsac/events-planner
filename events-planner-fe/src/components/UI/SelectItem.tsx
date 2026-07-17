import { CheckIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  color?: string;
};

export default function SelectItem({
  value,
  children,
  color,
}: SelectItemProps) {
  return (
    <Select.Item
      value={value}
      className="
        relative flex cursor-pointer select-none items-center
        rounded-lg py-2 pl-8 pr-3 text-sm outline-none
        hover:bg-gray-100
      "
    >
      <Select.ItemIndicator className="absolute left-2">
        <CheckIcon />
      </Select.ItemIndicator>

      <div className="flex items-center gap-2">
        {color && (
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}

        <Select.ItemText>{children}</Select.ItemText>
      </div>
    </Select.Item>
  );
}
