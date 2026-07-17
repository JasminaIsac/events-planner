import { HOURS } from "~/config/calendarLayout";
import { formatHour } from "~/utils";

type TimeColumnProps = {
  hiddenHour?: number | null;
};

export default function TimeColumn({ hiddenHour }: TimeColumnProps) {
  return (
    <div className="h-full grid grid-rows-24">
      {HOURS.map((hour) => (
        <div
          key={hour}
          className="flex items-start justify-center leading-0 text-sm text-gray-800 text-center"
        >
          {hiddenHour === hour ? "" : formatHour(hour)}
        </div>
      ))}
    </div>
  );
}
