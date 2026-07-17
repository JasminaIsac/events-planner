import type { CreateEventDto, Event, UpdateEventDto } from "~/types";

import { apiFetch } from "./client";

export const getEvents = () => {
  return apiFetch<Event[]>("/events");
};

export const getEventsByDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const params = new URLSearchParams({
    startDate: start.toISOString(),
    endDate: end.toISOString(),
  });

  return apiFetch<Event[]>(`/events/range?${params.toString()}`);
};

export const getEventById = (id: string) => {
  return apiFetch<Event>(`/events/${id}`);
};

export const createEvent = (event: CreateEventDto) => {
  return apiFetch<Event>("/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
};

export const updateEvent = (id: string, event: UpdateEventDto) => {
  return apiFetch<Event>(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
};

export const deleteEvent = (id: string) => {
  return apiFetch<void>(`/events/${id}`, {
    method: "DELETE",
  });
};
