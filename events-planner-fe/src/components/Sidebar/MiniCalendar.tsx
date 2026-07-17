import { useCallback, useMemo, useState } from "react";

import { useEvents } from "~/hooks";
import { useNow } from "~/hooks/UseNow";
import { useCalendarStore } from "~/store/calendarStore";
import { WEEK_DAYS } from "~/types";
import {
  getCalendarMonthCells,
  getDateKey,
  getMonthRange,
  getMonthStart,
  getNextMonth,
  groupEventsByDate,
  isSameDay,
} from "~/utils";

import MiniCalendarDayCell from "./MiniCalendarDayCell";
import MiniCalendarHeader from "./MiniCalendarHeader";

export default function MiniCalendar() {
  const now = useNow();

  const { activeDate, visibleDate, setActiveDate, setVisibleDate } =
    useCalendarStore();

  const activeMonth = getMonthStart(visibleDate);
  const [monthView, setMonthView] = useState(() => ({
    visibleDate,
    month: activeMonth,
  }));

  const currentMonth =
    monthView.visibleDate === visibleDate ? monthView.month : activeMonth;

  const monthRange = useMemo(() => getMonthRange(currentMonth), [currentMonth]);

  const { data: events = [] } = useEvents({
    startDate: monthRange.start,
    endDate: monthRange.end,
  });

  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  const days = useMemo(
    () => getCalendarMonthCells(currentMonth),
    [currentMonth],
  );

  const changeMonth = (dir: number) => {
    setMonthView((view) => ({
      visibleDate,
      month: getNextMonth(
        view.visibleDate === visibleDate ? view.month : activeMonth,
        dir,
      ),
    }));
  };

  const selectDate = useCallback(
    (date: Date) => {
      setActiveDate(date);
      setVisibleDate(date);
      setMonthView({
        visibleDate: date,
        month: getMonthStart(date),
      });
    },
    [setActiveDate, setVisibleDate],
  );

  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <MiniCalendarHeader
        month={currentMonth}
        onPrev={() => changeMonth(-1)}
        onNext={() => changeMonth(1)}
      />

      <div className="py-2 flex flex-col gap-4">
        <div className="grid grid-cols-7 text-center justify-between text-sm font-semibold text-gray-400">
          {WEEK_DAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((d) => {
            const cellDate = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + d.monthOffset,
              d.day,
            );

            const dateKey = getDateKey(cellDate);
            const dayEvents = eventsByDate[dateKey] ?? [];

            return (
              <MiniCalendarDayCell
                key={dateKey}
                day={d.day}
                muted={d.muted}
                events={dayEvents.slice(0, 3)}
                isSelected={isSameDay(cellDate, activeDate)}
                isToday={isSameDay(cellDate, now)}
                onClick={() => selectDate(cellDate)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
