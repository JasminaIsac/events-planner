import { HOUR_HEIGHT } from "~/config/calendarLayout";
import { EVENT_COLORS } from "~/config/styleConstants";
import type { EventFormValues } from "~/schemas/addEventSchema";
import type { Event, EventLayout } from "~/types";

import { combineDateAndTime, getDateKey } from "./dateUtils";

export function isEventOngoing(event: Event, now = new Date()) {
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);

  return start <= now && end >= now;
}

export function groupEventsByDate(events: Event[]) {
  return events.reduce<Record<string, Event[]>>((acc, event) => {
    const start = new Date(event.startDateTime);

    const key = getDateKey(start);

    acc[key] ??= [];
    acc[key].push(event);

    return acc;
  }, {});
}

export function groupEventsByMonth(events: Event[]) {
  return events.reduce<Record<number, Event[]>>((acc, event) => {
    const start = new Date(event.startDateTime);
    const monthIndex = start.getMonth();

    acc[monthIndex] ??= [];
    acc[monthIndex].push(event);

    return acc;
  }, {});
}

export function eventsOverlap(a: Event, b: Event) {
  const aStart = new Date(a.startDateTime).getTime();
  const aEnd = new Date(a.endDateTime).getTime();

  const bStart = new Date(b.startDateTime).getTime();
  const bEnd = new Date(b.endDateTime).getTime();

  return aStart < bEnd && bStart < aEnd;
}

export function getEventsLayout(dayEvents: Event[]) {
  return dayEvents.reduce<Record<string, EventLayout>>((acc, event) => {
    const start = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);

    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();

    const duration = endMinutes - startMinutes;
    const visualDuration = Math.max(duration, 15);

    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = (visualDuration / 60) * HOUR_HEIGHT;

    const overlappingEvents = dayEvents.filter((dayEvent) =>
      eventsOverlap(event, dayEvent),
    );

    const overlapIndex = overlappingEvents.findIndex(
      (overlappingEvent) => overlappingEvent.id === event.id,
    );

    const eventWidth = 100 / overlappingEvents.length || 100;

    acc[event.id] = {
      duration,
      style: {
        top,
        height,
        left: `${overlapIndex * eventWidth}%`,
        width: `${eventWidth}%`,
      },
    };

    return acc;
  }, {});
}

export function buildEventPayload(data: EventFormValues) {
  return {
    title: data.title,
    description: data.description || null,
    category: data.category,
    color: data.color || EVENT_COLORS[0].value,
    startDateTime: combineDateAndTime(data.date, data.startTime),
    endDateTime: combineDateAndTime(data.date, data.endTime),
  };
}
