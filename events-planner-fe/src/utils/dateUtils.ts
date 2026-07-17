import type { MiniCalendarDay } from "~/types";

export const getMonthDaysNumber = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

export const getFirstMonthDay = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const getMonthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getYearStart = (date: Date) => new Date(date.getFullYear(), 0, 1);

export const getNextMonth = (date: Date, dir: number) =>
  getMonthStart(addMonths(date, dir));

export const pad = (n: number) => String(n).padStart(2, "0");

export function getDateKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}

export function getMonthKey(date: Date, monthIndex: number) {
  return `${date.getFullYear()}-${pad(monthIndex + 1)}`;
}

export function getTodayKey() {
  return getDateKey(new Date());
}

export function getCurrentTimeKey() {
  const now = new Date();

  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export const isSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

export function addYears(date: Date, years: number) {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
}

export const formatDate = (date: string | Date) => {
  const eventDate = new Date(date);

  return eventDate.toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatHour = (hour: number) => {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour} ${suffix}`;
};

export function formatTime(dateTime: string | Date) {
  const date = new Date(dateTime);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDateWithoutYear(date: string | Date) {
  const eventDate = new Date(date);

  return eventDate.toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "short",
  });
}

export function formatWeekday(
  date: Date,
  format: "short" | "long" = "short",
): string {
  return date.toLocaleDateString("en-US", {
    weekday: format,
  });
}

function createDateRange(start: Date, end: Date) {
  return {
    start: getDateKey(start),
    end: getDateKey(end),
  };
}

export function getMonthRange(date: Date) {
  const monthStart = getMonthStart(date);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const gridStart = getStartOfWeek(monthStart);
  const gridEnd = addDays(monthEnd, 6 - monthEnd.getDay());

  return createDateRange(gridStart, gridEnd);
}

export function getYearRange(date: Date) {
  const yearStart = getYearStart(date);
  const yearEnd = new Date(date.getFullYear(), 11, 31);

  return createDateRange(yearStart, yearEnd);
}

export function getDaysRange(days: Date[]) {
  if (!days.length) {
    return null;
  }

  return createDateRange(days[0], days[days.length - 1]);
}

export const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);
  return d;
};

export const getWeekDays = (startDate: Date) =>
  Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

export function formatTimezone(date: Date = new Date()): string {
  const timezonePart = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;

  const offsetMinutes = date.getTimezoneOffset();
  const offsetHours = -offsetMinutes / 60;
  const offsetString = `GMT${offsetHours >= 0 ? "+" : ""}${offsetHours}`;

  let label: string;

  if (timezonePart && !timezonePart.includes("GMT")) {
    label = `${timezonePart} ${offsetString}`;
  } else {
    label = offsetString;
  }

  return label;
}

export function combineDateAndTime(date: string, time: string) {
  return new Date(`${date}T${time}`).toISOString();
}

export function isValidDateTime(date: string, time: string) {
  return Boolean(
    date && time && !Number.isNaN(new Date(`${date}T${time}`).getTime()),
  );
}

export function getCalendarMonthCells(month: Date): MiniCalendarDay[] {
  const daysInMonth = getMonthDaysNumber(month.getFullYear(), month.getMonth());
  const firstDay = getFirstMonthDay(month.getFullYear(), month.getMonth());

  const prevMonthDays = getMonthDaysNumber(
    month.getFullYear(),
    month.getMonth() - 1,
  );

  const cells: MiniCalendarDay[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthDays - i,
      muted: true,
      monthOffset: -1,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    cells.push({
      day: i,
      muted: false,
      monthOffset: 0,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      day: cells.length - (daysInMonth + firstDay) + 1,
      muted: true,
      monthOffset: 1,
    });
  }

  return cells;
}
