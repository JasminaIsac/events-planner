import { formatDate, formatWeekday } from "~/utils";

export default function UpcomingHeader({
  isToday,
  date,
}: {
  isToday: boolean;
  date: Date;
}) {
  return (
    <div className="text-md text-center mb-1">
      {isToday ? (
        <div className="text-blue-400">
          <span className="font-bold">TODAY</span>{" "}
          <span>{formatDate(date)}</span>
        </div>
      ) : (
        <div className="text-gray-400">
          <span className="font-bold">
            {formatWeekday(date, "long").toUpperCase()}
          </span>{" "}
          <span className="text-sm">{formatDate(date)}</span>
        </div>
      )}
    </div>
  );
}
