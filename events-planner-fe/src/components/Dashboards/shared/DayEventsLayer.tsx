import { useMemo } from "react";

import { EventCard, EventPopover } from "~/components/Events";
import type { Event } from "~/types";
import { getEventsLayout } from "~/utils/eventUtils";

type DayEventsLayerProps = {
  events: Event[];
  selectedEvent: Event | null;
  onSelectEvent: (event: Event | null) => void;
};

export default function DayEventsLayer({
  events,
  selectedEvent,
  onSelectEvent,
}: DayEventsLayerProps) {
  const eventLayouts = useMemo(() => getEventsLayout(events), [events]);
  return (
    <>
      {events.map((event) => {
        const { duration, style } = eventLayouts[event.id];
        const isOpen = selectedEvent?.id === event.id;

        return (
          <EventPopover
            key={event.id}
            event={event}
            isOpen={isOpen}
            onOpen={(open: boolean) => {
              onSelectEvent(open ? event : null);
            }}
            onClose={() => onSelectEvent(null)}
          >
            <EventCard event={event} duration={duration} style={style} />
          </EventPopover>
        );
      })}
    </>
  );
}
