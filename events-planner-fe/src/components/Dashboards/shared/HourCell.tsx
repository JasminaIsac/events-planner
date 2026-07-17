import { HOUR_HALFS, type HourHalf } from "~/types";

type HourCellProps = {
  hour: number;
  isToday?: boolean;
  isWeekend?: boolean;
  isSlotDisabled?: (hour: number, half: HourHalf) => boolean;
  onSelectSlot?: (hour: number, half: HourHalf) => void;
};

const HOUR_HALF_STYLES: Partial<Record<HourHalf, string>> = {
  start: "border-b border-gray-100",
};

const HOUR_HALF_ENTRIES = Object.entries(HOUR_HALFS) as [
  HourHalf,
  (typeof HOUR_HALFS)[HourHalf],
][];

export default function HourCell({
  hour,
  isToday = false,
  isWeekend = false,
  isSlotDisabled,
  onSelectSlot,
}: HourCellProps) {
  const stateClasses = isToday
    ? "bg-blue-50 hover:bg-blue-100 border-blue-200"
    : isWeekend
      ? "bg-gray-50 hover:bg-gray-100 border-gray-100"
      : "bg-white hover:bg-gray-50";

  return (
    <div className="flex h-full flex-col border-t border-gray-200 bg-white">
      {HOUR_HALF_ENTRIES.map(([half, config]) => {
        const disabled = isSlotDisabled?.(hour, half) ?? false;
        const border = HOUR_HALF_STYLES[half] ?? "";

        return (
          <button
            key={half}
            type="button"
            disabled={disabled}
            className={`min-h-0 flex-1 w-full ${border} ${stateClasses}`}
            onClick={() => onSelectSlot?.(hour, half)}
            aria-label={`Add event at ${hour}:${String(config.startMinute).padStart(2, "0")}`}
          />
        );
      })}
    </div>
  );
}
