import { CellHeader } from "~/components/Dashboards/shared";
import EventPreviewList from "~/components/Events/EventPreviewList";
import { displayModes, type Event } from "~/types";

type MonthCellProps = {
  monthName: string;
  monthEvents: Event[];
  eventsCount: number;
  isSelected?: boolean;
  isCurrentMonth: boolean;
  onClick?: () => void;
};

export default function MonthCell({
  monthName,
  monthEvents,
  eventsCount,
  isSelected,
  isCurrentMonth,
  onClick,
}: MonthCellProps) {
  return (
    <div
      role="button"
      onClick={onClick}
      className={`
        flex flex-col gap-1 border-r border-b border-gray-100 p-4 text-left
        hover:bg-gray-50
        ${isSelected ? "ring-2 ring-inset ring-blue-500" : ""}
      `}
    >
      <CellHeader
        title={monthName}
        isToday={isCurrentMonth}
        eventsCount={eventsCount}
      />

      <EventPreviewList
        events={monthEvents}
        maxVisible={5}
        display={displayModes.date}
      />
    </div>
  );
}
