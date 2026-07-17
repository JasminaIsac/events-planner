import { useMemo } from "react";

import DashboardTimeGrid from "~/components/Dashboards/shared/DashboardTimeGrid";
import { useCalendarStore } from "~/store/calendarStore";
import { formatTimezone, getStartOfWeek, getWeekDays } from "~/utils";

import WeekHeader from "./WeekHeader";

export default function WeekDashboard() {
  const { activeDate, visibleDate } = useCalendarStore();

  const weekStart = useMemo(() => getStartOfWeek(visibleDate), [visibleDate]);
  const weekDays = useMemo(() => getWeekDays(weekStart), [weekStart]);
  const tmz = formatTimezone(visibleDate);

  return (
    <DashboardTimeGrid
      days={weekDays}
      selectedDate={activeDate}
      header={<WeekHeader weekDays={weekDays} timezone={tmz} />}
    />
  );
}
