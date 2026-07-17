import { WEEK_DAYS } from "~/types";

export default function MonthHeader() {
  return (
    <div className="grid grid-cols-7 border-b border-gray-100">
      {WEEK_DAYS.map((day) => (
        <div
          key={day}
          className="flex items-center justify-center text-sm font-semibold text-gray-500"
        >
          {day}
        </div>
      ))}
    </div>
  );
}
