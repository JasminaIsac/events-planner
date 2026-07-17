import CellHeader from "~/components/Dashboards/shared/CellHeader";
import EventPreviewList from "~/components/Events/EventPreviewList";
import { displayModes, type Event } from "~/types";

type DayCellProps = {
  cellDate: Date;
  dayEvents: Event[];
  isToday: boolean;
  isSelected: boolean;
  isMuted: boolean;
  onClick: () => void;
};

export default function DayCell({
  cellDate,
  dayEvents,
  isToday,
  isSelected,
  isMuted,
  onClick,
}: DayCellProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={`
        min-h-24 border-r border-b border-gray-100 p-2 text-left
        hover:bg-gray-50
        ${isMuted ? "bg-gray-50 text-gray-400" : "bg-white text-gray-900"}
        ${isSelected ? "ring-2 ring-inset ring-blue-500" : ""}
      `}
    >
      <CellHeader
        title={cellDate.getDate().toString()}
        isToday={isToday}
        eventsCount={dayEvents.length}
      />

      <EventPreviewList
        events={dayEvents}
        maxVisible={3}
        display={displayModes.time}
      />
    </div>
  );
}
