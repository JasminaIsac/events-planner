import { HOUR_HEIGHT } from "~/config/calendarLayout";
import type { HourHalf, SelectedSlot } from "~/types";
import { HOUR_HALFS } from "~/types";

import { getDateKey } from "./dateUtils";

type HalfMinute = 0 | 30;

export function getHiddenHour(now: Date) {
  const minutes = now.getMinutes();

  if (minutes <= 8) {
    return now.getHours();
  }

  if (minutes >= 52) {
    return now.getHours() + 1;
  }

  return null;
}

export function formatSlotTime(hour: number, minute: HalfMinute) {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function getSlotDateTime(day: Date, hour: number, half: HourHalf) {
  const minute = HOUR_HALFS[half].startMinute;

  return new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    hour,
    minute,
    0,
    0,
  );
}

export function getSlotTimeRange(hour: number, half: HourHalf) {
  const startMinute = HOUR_HALFS[half].startMinute;
  const endHour = hour + HOUR_HALFS[half].endHourOffset;
  const endMinute = HOUR_HALFS[half].endMinute;

  const endOfDay = endHour >= 24;
  return {
    startTime: formatSlotTime(hour, startMinute),
    endTime: endOfDay ? "23:59" : formatSlotTime(endHour, endMinute),
  };
}

export function createSelectedSlot(
  day: Date,
  hour: number,
  half: HourHalf,
): SelectedSlot {
  const config = HOUR_HALFS[half];
  const { startTime, endTime } = getSlotTimeRange(hour, half);

  return {
    date: getDateKey(day),
    startTime,
    endTime,
    top: hour * HOUR_HEIGHT + HOUR_HEIGHT * config.topOffset,
  };
}
