import { HOUR_HEIGHT, TIME_COLUMN_WIDTH } from "~/config/calendarLayout";
import { isSameDay, pad } from "~/utils";

type NowBarProps = {
  days: Date[];
  selectedDate: Date;
  now: Date;
};

export default function NowBar({ days, selectedDate, now }: NowBarProps) {
  const top =
    now.getHours() * HOUR_HEIGHT + (now.getMinutes() / 60) * HOUR_HEIGHT;

  return (
    <div
      className="pointer-events-none absolute left-0 z-10 w-full grid -translate-y-1/2 items-center text-red-600"
      style={{
        top,
        gridTemplateColumns: `${TIME_COLUMN_WIDTH}px repeat(${days.length}, minmax(0, 1fr)) ${TIME_COLUMN_WIDTH}px`,
      }}
    >
      <p className="text-center text-sm font-semibold">
        {pad(now.getHours())}:{pad(now.getMinutes())}
      </p>

      {days.map((day) => {
        const isSelectedDay = isSameDay(day, selectedDate);

        return (
          <div key={day.toISOString()} className="relative flex items-center">
            <hr
              className={
                isSelectedDay ? "w-full border-t-2" : "w-full border-t"
              }
            />

            {isSelectedDay && (
              <>
                <span className="absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-red-600" />
                <span className="absolute right-0 h-2 w-2 translate-x-1/2 rounded-full bg-red-600" />
              </>
            )}
          </div>
        );
      })}
      <div />
    </div>
  );
}
