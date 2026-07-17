import { EVENT_CATEGORIES } from "~/types";
import { combineDateAndTime, isValidDateTime } from "~/utils/dateUtils";

import * as z from "zod";

export const eventFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    color: z.string().min(1, "Color is required"),
    category: z.enum([EVENT_CATEGORIES.ONLINE, EVENT_CATEGORIES.OFFLINE]),
  })
  .refine(
    (data) => {
      if (!isValidDateTime(data.date, data.startTime)) {
        return true;
      }

      return (
        new Date(combineDateAndTime(data.date, data.startTime)) >= new Date()
      );
    },
    {
      message: "Start time cannot be in the past",
      path: ["startTime"],
    },
  )
  .refine(
    (data) => {
      if (
        !isValidDateTime(data.date, data.startTime) ||
        !isValidDateTime(data.date, data.endTime)
      ) {
        return true;
      }

      return (
        new Date(combineDateAndTime(data.date, data.endTime)) >
        new Date(combineDateAndTime(data.date, data.startTime))
      );
    },
    {
      message: "Event duration must be at least 1 minute",
      path: ["endTime"],
    },
  );

export type EventFormValues = z.infer<typeof eventFormSchema>;
