import { formatWeekday, isSameDay, isWeekend } from "~/utils";

type WeekHeaderProps = {
  weekDays: Date[];
  timezone: string;
};

export default function WeekHeader({ weekDays, timezone }: WeekHeaderProps) {
  return (
    <div className="z-10 grid grid-cols-[64px_repeat(7,1fr)_64px] bg-white">
      <div />
      {weekDays.map((day) => {
        const isTodayDay = isSameDay(day, new Date());
        const isWeekendDay = isWeekend(day);

        return (
          <div
            key={day.toISOString()}
            className={`
              flex flex-col items-start justify-center p-2 border-r last:border-r-0 border-gray-100
              ${isTodayDay ? "bg-blue-50" : ""}
              ${!isTodayDay && isWeekendDay ? "bg-gray-50" : ""}
            `}
          >
            <div className="text-sm font-semibold text-gray-600">
              {formatWeekday(day, "short").toUpperCase()}
            </div>
            <div className="text-3xl font-semibold">{day.getDate()}</div>
          </div>
        );
      })}
      <div>
        <p className="flex items-start justify-center text-sm text-gray-800">
          {timezone}
        </p>
      </div>
    </div>
  );
}
