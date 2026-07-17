import { useState } from "react";

import { EventCardSmall } from "~/components/Events";
import EventPopover from "~/components/Events/EventPopover";
import type { DisplayMode, Event } from "~/types";

type EventPreviewListProps = {
  events: Event[];
  maxVisible: number;
  display: DisplayMode;
};

export default function EventPreviewList({
  events,
  maxVisible,
  display,
}: EventPreviewListProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {events.slice(0, maxVisible).map((event) => {
        const isOpen = selectedEvent?.id === event.id;
        return (
          <EventPopover
            key={event.id}
            event={event}
            isOpen={isOpen}
            onOpen={(open: boolean) => {
              setSelectedEvent(open ? event : null);
            }}
            onClose={() => setSelectedEvent(null)}
          >
            <EventCardSmall dayEvent={event} display={display} />
          </EventPopover>
        );
      })}
    </div>
  );
}
