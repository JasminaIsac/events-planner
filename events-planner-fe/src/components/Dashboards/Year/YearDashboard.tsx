import { useMemo } from "react";

import { DashboardHeader } from "~/components/Dashboards/shared";
import { useEvents } from "~/hooks";
import { useNow } from "~/hooks/UseNow";
import { useCalendarStore } from "~/store/calendarStore";
import { MONTH_NAMES } from "~/types";
import {
  getMonthKey,
  getYearRange,
  getYearStart,
  groupEventsByMonth,
} from "~/utils";

import MonthCell from "./MonthCell";

export default function YearDashboard() {
  const { visibleDate, setActiveDate, setVisibleDate } = useCalendarStore();

  const now = useNow();

  const year = useMemo(() => getYearStart(visibleDate), [visibleDate]);
  const yearRange = useMemo(() => getYearRange(year), [year]);

  const { data: events = [] } = useEvents({
    startDate: yearRange.start,
    endDate: yearRange.end,
  });

  const eventsByMonth = useMemo(() => groupEventsByMonth(events), [events]);

  return (
    <div className="grid h-full min-h-0 grid-rows-[68px_1fr] bg-white ">
      <DashboardHeader title={year.getFullYear().toString()} />

      <div className="grid min-h-0 grid-cols-4 auto-rows-fr">
        {MONTH_NAMES.map((monthName, monthIndex) => {
          const monthEvents = eventsByMonth[monthIndex] ?? [];
          const isCurrentMonth =
            monthIndex === now.getMonth() &&
            year.getFullYear() === now.getFullYear();

          return (
            <MonthCell
              key={getMonthKey(year, monthIndex)}
              monthName={monthName}
              isSelected={
                monthIndex === visibleDate.getMonth() &&
                year.getFullYear() === visibleDate.getFullYear()
              }
              monthEvents={monthEvents.slice(0, 5)}
              isCurrentMonth={isCurrentMonth}
              eventsCount={monthEvents.length}
              onClick={() => {
                const date = new Date(year.getFullYear(), monthIndex, 1);
                setActiveDate(date);
                setVisibleDate(date);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
