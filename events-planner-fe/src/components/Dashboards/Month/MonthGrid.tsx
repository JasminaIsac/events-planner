import { useNow } from "~/hooks/UseNow";
import type { Event, MiniCalendarDay } from "~/types";
import { getDateKey, isSameDay } from "~/utils/dateUtils";

import DayCell from "./DayCell";

type MonthGridProps = {
  month: Date;
  days: MiniCalendarDay[];
  eventsByDate: Record<string, Event[]>;
  activeDate: Date;
  onClick: (date: Date) => void;
};

export default function MonthGrid({
  month,
  days,
  eventsByDate,
  activeDate,
  onClick,
}: MonthGridProps) {
  const now = useNow();

  return (
    <div className="grid min-h-0 grid-cols-7 auto-rows-fr">
      {days.map((day) => {
        const cellDate = new Date(
          month.getFullYear(),
          month.getMonth() + day.monthOffset,
          day.day,
        );

        const dateKey = getDateKey(cellDate);
        const dayEvents = eventsByDate[dateKey] ?? [];
        const isToday = isSameDay(cellDate, now);
        const isSelected = isSameDay(cellDate, activeDate);

        return (
          <DayCell
            key={dateKey}
            cellDate={cellDate}
            dayEvents={dayEvents}
            isToday={isToday}
            isSelected={isSelected}
            isMuted={day.muted}
            onClick={() => onClick(cellDate)}
          />
        );
      })}
    </div>
  );
}
