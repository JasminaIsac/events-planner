import UpcomingEvents from "~/components/Events/UpcomingEvents";

import MiniCalendar from "./MiniCalendar";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar() {
  return (
    <aside className="h-full min-h-0 overflow-y-auto hide-scrollbar bg-[#18181B] p-4 text-white">
      <SidebarHeader />
      <MiniCalendar />
      <UpcomingEvents />
    </aside>
  );
}
