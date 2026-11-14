import type { CreateEventDto, Event, UpdateEventDto } from "~/types";

import { http, HttpResponse } from "msw";

import { cloneSeedEvents } from "./data/events";
import { createDemoAccessToken, DEMO_USER } from "./data/user";

let events = cloneSeedEvents();
let nextEventId = events.length + 1;

function authResponse() {
  return HttpResponse.json({ accessToken: createDemoAccessToken() });
}

function parseIso(value: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function filterByRange(startDate: string | null, endDate: string | null) {
  const start = parseIso(startDate);
  const end = parseIso(endDate);

  return events.filter((event) => {
    if (event.isDeleted) {
      return false;
    }

    const eventStart = new Date(event.startDateTime).getTime();
    const eventEnd = new Date(event.endDateTime).getTime();

    if (start && eventEnd < start.getTime()) {
      return false;
    }

    if (end && eventStart > end.getTime()) {
      return false;
    }

    return true;
  });
}

export const handlers = [
  http.post("*/api/auth/login", async () => authResponse()),

  http.post("*/api/auth/register", async () => authResponse()),

  http.post("*/api/auth/refresh", async () => authResponse()),

  http.post("*/api/auth/logout", async () => {
    return new HttpResponse(null, { status: 204 });
  }),

  http.get("*/api/users/me", async () => {
    return HttpResponse.json(DEMO_USER);
  }),

  http.get("*/api/events/range", ({ request }) => {
    const url = new URL(request.url);
    const result = filterByRange(
      url.searchParams.get("startDate"),
      url.searchParams.get("endDate"),
    );

    return HttpResponse.json(result);
  }),

  http.get("*/api/events/:id", ({ params }) => {
    const event = events.find(
      (item) => item.id === String(params.id) && !item.isDeleted,
    );

    if (!event) {
      return HttpResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return HttpResponse.json(event);
  }),

  http.get("*/api/events", () => {
    return HttpResponse.json(events.filter((event) => !event.isDeleted));
  }),

  http.post("*/api/events", async ({ request }) => {
    const body = (await request.json()) as CreateEventDto;
    const now = new Date().toISOString();

    const created: Event = {
      id: String(nextEventId++),
      title: body.title,
      description: body.description ?? null,
      category: body.category,
      startDateTime: body.startDateTime,
      endDateTime: body.endDateTime,
      organizerId: DEMO_USER.id,
      color: body.color,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
    };

    events = [...events, created];
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put("*/api/events/:id", async ({ params, request }) => {
    const id = String(params.id);
    const body = (await request.json()) as UpdateEventDto;
    const index = events.findIndex(
      (event) => event.id === id && !event.isDeleted,
    );

    if (index === -1) {
      return HttpResponse.json({ message: "Event not found" }, { status: 404 });
    }

    const updated: Event = {
      ...events[index],
      title: body.title,
      description: body.description ?? null,
      category: body.category,
      startDateTime: body.startDateTime,
      endDateTime: body.endDateTime,
      color: body.color,
      updatedAt: new Date().toISOString(),
    };

    events = events.map((event, eventIndex) =>
      eventIndex === index ? updated : event,
    );

    return HttpResponse.json(updated);
  }),

  http.delete("*/api/events/:id", ({ params }) => {
    const id = String(params.id);
    const index = events.findIndex(
      (event) => event.id === id && !event.isDeleted,
    );

    if (index === -1) {
      return HttpResponse.json({ message: "Event not found" }, { status: 404 });
    }

    events = events.map((event, eventIndex) =>
      eventIndex === index
        ? {
            ...event,
            isDeleted: true,
            updatedAt: new Date().toISOString(),
          }
        : event,
    );

    return new HttpResponse(null, { status: 204 });
  }),
];
