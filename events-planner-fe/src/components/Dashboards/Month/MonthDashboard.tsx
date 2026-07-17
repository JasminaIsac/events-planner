import { useMemo } from "react";

import DashboardHeader from "~/components/Dashboards/shared/DashboardHeader";
import { useEvents } from "~/hooks";
import { useCalendarStore } from "~/store/calendarStore";
import {
  getCalendarMonthCells,
  getMonthRange,
  getMonthStart,
  groupEventsByDate,
} from "~/utils";

import MonthGrid from "./MonthGrid";
import MonthHeader from "./MonthHeader";

export default function MonthDashboard() {
  const { activeDate, visibleDate, setActiveDate, setVisibleDate } =
    useCalendarStore();

  const month = useMemo(() => getMonthStart(visibleDate), [visibleDate]);
  const monthRange = useMemo(() => getMonthRange(month), [month]);

  const { data: events = [] } = useEvents({
    startDate: monthRange.start,
    endDate: monthRange.end,
  });

  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);
  const days = useMemo(() => getCalendarMonthCells(month), [month]);

  return (
    <div className="grid h-full min-h-0 grid-rows-[68px_1fr] bg-white">
      <DashboardHeader
        title={month.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      />

      <div className="grid min-h-0 grid-rows-[40px_1fr]">
        <MonthHeader />

        <MonthGrid
          month={month}
          days={days}
          eventsByDate={eventsByDate}
          activeDate={activeDate}
          onClick={(date) => {
            setActiveDate(date);
            setVisibleDate(date);
          }}
        />
      </div>
    </div>
  );
}
