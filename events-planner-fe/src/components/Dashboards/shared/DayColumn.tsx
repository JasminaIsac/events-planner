import { useState } from "react";

import { HOUR_HEIGHT, HOURS } from "~/config/calendarLayout";
import { type Event, type HourHalf, type SelectedSlot } from "~/types";
import {
  createSelectedSlot,
  getSlotDateTime,
  isSameDay,
  isWeekend,
} from "~/utils";

import DayEventsLayer from "./DayEventsLayer";
import HourCell from "./HourCell";
import SelectedSlotPopover from "./SelectedSlotPopover";

type DayColumnProps = {
  day: Date;
  dayEvents: Event[];
  now: Date;
};

export default function DayColumn({ day, dayEvents, now }: DayColumnProps) {
  const isTodayDay = isSameDay(day, now);
  const isWeekendDay = isWeekend(day);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);

  const isSlotDisabled = (hour: number, half: HourHalf) =>
    getSlotDateTime(day, hour, half) < now;

  function handleSelectSlot(hour: number, half: HourHalf) {
    if (isSlotDisabled(hour, half)) {
      setSelectedSlot(null);
      return;
    }
    setSelectedSlot(createSelectedSlot(day, hour, half));
  }

  return (
    <div
      className={`
        relative grid border-r last:border-r-0 border-gray-100
        ${isTodayDay ? "bg-blue-50" : ""}
        ${!isTodayDay && isWeekendDay ? "bg-gray-50" : ""}`}
      style={{ gridTemplateRows: `repeat(${HOURS.length}, ${HOUR_HEIGHT}px)` }}
    >
      {HOURS.map((hour) => (
        <HourCell
          key={hour}
          hour={hour}
          isToday={isTodayDay}
          isWeekend={isWeekendDay}
          isSlotDisabled={isSlotDisabled}
          onSelectSlot={handleSelectSlot}
        />
      ))}

      <DayEventsLayer
        events={dayEvents}
        selectedEvent={selectedEvent}
        onSelectEvent={setSelectedEvent}
      />

      <SelectedSlotPopover
        selectedSlot={selectedSlot}
        onClose={() => setSelectedSlot(null)}
      />
    </div>
  );
}
