import DashboardTimeGrid from "~/components/Dashboards/shared/DashboardTimeGrid";
import { useCalendarStore } from "~/store/calendarStore";

export default function DayDashboard() {
  const { visibleDate } = useCalendarStore();

  return <DashboardTimeGrid days={[visibleDate]} selectedDate={visibleDate} />;
}
