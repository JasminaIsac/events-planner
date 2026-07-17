export const queryKeys = {
  events: {
    all: ["events"] as const,
    range: (startDate: string, endDate: string) =>
      ["events", "range", { startDate, endDate }] as const,
    detail: (id: string) => ["events", id] as const,
  },

  users: {
    all: ["users"] as const,
    detail: (id: string) => ["users", id] as const,
    current: ["users", "me"] as const,
  },
};
