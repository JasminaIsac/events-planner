export const EVENT_CATEGORIES = {
  ONLINE: "Online",
  OFFLINE: "Offline",
} as const;

export type EventCategory =
  (typeof EVENT_CATEGORIES)[keyof typeof EVENT_CATEGORIES];

export type Event = {
  id: string;
  title: string;
  description: string | null;
  category: EventCategory;
  startDateTime: string;
  endDateTime: string;
  organizerId: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type CreateEventDto = {
  title: string;
  description?: string | null;
  category: EventCategory;
  startDateTime: string;
  endDateTime: string;
  color: string;
};

export type UpdateEventDto = {
  title: string;
  description?: string | null;
  category: EventCategory;
  startDateTime: string;
  endDateTime: string;
  color: string;
};
