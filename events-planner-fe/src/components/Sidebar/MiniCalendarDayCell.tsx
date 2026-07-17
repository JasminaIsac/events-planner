import type { Event } from "~/types";

type MiniCalendarDayCellProps = {
  day: number;
  muted: boolean;
  events: Event[];
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
};

export default function MiniCalendarDayCell({
  day,
  muted,
  events,
  isSelected,
  isToday,
  onClick,
}: MiniCalendarDayCellProps) {
  const baseClass =
    "flex h-8 w-8 flex-col items-center justify-center gap-0.5 rounded-full text-sm font-semibold";

  const textClass = isSelected
    ? "text-white"
    : isToday
      ? "text-red-400"
      : muted
        ? "text-gray-400"
        : "text-white";

  const selectedClass = isSelected ? "bg-blue-500" : "";

  return (
    <button
      type="button"
      className="flex h-8 cursor-pointer items-start justify-center"
      onClick={onClick}
    >
      <div className={`${baseClass} ${textClass} ${selectedClass}`}>
        <span className="leading-none">{day}</span>

        <div className="mt-0.5 flex h-1.5 gap-0.5">
          {events.map((event) => (
            <span
              key={event.id}
              className="h-1 w-1 rounded-full"
              style={{
                backgroundColor: isSelected ? "#fff" : event.color,
              }}
            />
          ))}
        </div>
      </div>
    </button>
  );
}
