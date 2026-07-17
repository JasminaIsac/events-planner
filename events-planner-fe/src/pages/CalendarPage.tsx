import {
  DayDashboard,
  MonthDashboard,
  WeekDashboard,
  YearDashboard,
} from "~/components/Dashboards";
import { Navbar } from "~/components/Navbar";
import { Sidebar } from "~/components/Sidebar";
import { useCalendarStore } from "~/store/calendarStore";
import type { ViewMode } from "~/types";

const VIEW_COMPONENTS = {
  day: DayDashboard,
  week: WeekDashboard,
  month: MonthDashboard,
  year: YearDashboard,
} satisfies Record<ViewMode, React.ComponentType>;

export default function CalendarPage() {
  const { view } = useCalendarStore();
  const ActiveDashboard = VIEW_COMPONENTS[view];

  return (
    <div className="grid h-screen grid-cols-[300px_1fr] overflow-hidden">
      <Sidebar />

      <div className="grid min-h-0 grid-rows-[auto_1fr]">
        <Navbar />
        <main className="min-h-0 overflow-hidden">
          <ActiveDashboard />
        </main>
      </div>
    </div>
  );
}
