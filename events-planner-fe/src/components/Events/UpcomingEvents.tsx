import { useMemo } from "react";

import { EmptyState } from "~/components/UI";
import { useEvents } from "~/hooks";
import { useNow } from "~/hooks/UseNow";
import {
  addMonths,
  getDateKey,
  groupEventsByDate,
  isEventOngoing,
  isSameDay,
} from "~/utils";

import OngoingEvent from "./OngoingEvent";
import UpcomingEventCard from "./UpcomingEventCard";
import UpcomingHeader from "./UpcomingHeader";

export default function UpcomingEvents() {
  const now = useNow();

  const dateRange = useMemo(() => {
    const end = addMonths(now, 1);

    return {
      startDate: getDateKey(now),
      endDate: getDateKey(end),
    };
  }, [now]);

  const { data: events = [] } = useEvents(dateRange);

  const ongoingEvents = useMemo(
    () => events.filter((event) => isEventOngoing(event, now)),
    [events, now],
  );

  const ongoingEventIds = useMemo(
    () => new Set(ongoingEvents.map((event) => event.id)),
    [ongoingEvents],
  );

  const groupedEvents = useMemo(() => groupEventsByDate(events), [events]);

  if (!events.length) {
    return <EmptyState text="No upcoming events" />;
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-3">
        {Object.entries(groupedEvents).map(([date, eventsByDate]) => {
          const day = new Date(date);
          const isToday = isSameDay(day, now);

          const upcomingEvents = eventsByDate.filter(
            (event) => !ongoingEventIds.has(event.id),
          );

          return (
            <div key={date}>
              <UpcomingHeader isToday={isToday} date={day} />

              <div className="flex flex-col gap-2">
                {isToday &&
                  ongoingEvents.map((event) => (
                    <OngoingEvent key={event.id} event={event} />
                  ))}

                {upcomingEvents.map((event) => (
                  <UpcomingEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
