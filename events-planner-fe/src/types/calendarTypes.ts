export type MiniCalendarDay = {
  day: number;
  muted: boolean;
  monthOffset: -1 | 0 | 1;
};

export const WEEK_DAYS = [
  "MON",
  "TUE",
  "WEN",
  "THU",
  "FRI",
  "SAT",
  "SUN",
] as const;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const VIEW_MODES = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
] as const;

export type ViewMode = (typeof VIEW_MODES)[number]["value"];

export type EventLayout = {
  duration: number;
  style: {
    top: number;
    height: number;
    left: string;
    width: string;
  };
};

export type SelectedSlot = {
  date: string;
  startTime: string;
  endTime: string;
  top: number;
};

export const HOUR_HALFS = {
  start: {
    startMinute: 0,
    endHourOffset: 0,
    endMinute: 30,
    topOffset: 0,
  },
  end: {
    startMinute: 30,
    endHourOffset: 1,
    endMinute: 0,
    topOffset: 0.5,
  },
} as const;

export type HourHalf = keyof typeof HOUR_HALFS;

export const displayModes = {
  date: "date",
  time: "time",
} as const;

export type DisplayMode = (typeof displayModes)[keyof typeof displayModes];
