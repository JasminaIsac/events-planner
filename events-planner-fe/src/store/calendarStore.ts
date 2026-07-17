import type { ViewMode } from "~/types";
import { addDays, addMonths, addYears } from "~/utils";

import { create } from "zustand";

type CalendarState = {
  activeDate: Date;
  visibleDate: Date;
  view: ViewMode;

  setActiveDate: (date: Date) => void;
  goToday: () => void;
  goNext: () => void;
  goPrev: () => void;
  setVisibleDate: (date: Date) => void;
  setView: (view: ViewMode) => void;
};

type Direction = 1 | -1;
type ViewShifter = (date: Date, direction: Direction) => Date;

const VIEW_SHIFTERS = {
  day: (date, direction) => addDays(date, direction),
  week: (date, direction) => addDays(date, direction * 7),
  month: (date, direction) => addMonths(date, direction),
  year: (date, direction) => addYears(date, direction),
} satisfies Record<ViewMode, ViewShifter>;

const getShiftedVisibleDate = (
  date: Date,
  view: ViewMode,
  direction: Direction,
) => VIEW_SHIFTERS[view](date, direction);

export const useCalendarStore = create<CalendarState>((set, get) => ({
  activeDate: new Date(),
  visibleDate: new Date(),
  view: "week",

  setActiveDate: (date: Date) => set({ activeDate: date }),

  goToday: () => set({ activeDate: new Date(), visibleDate: new Date() }),

  goNext: () => {
    const { visibleDate, view } = get();

    set({ visibleDate: getShiftedVisibleDate(visibleDate, view, 1) });
  },

  goPrev: () => {
    const { visibleDate, view } = get();

    set({ visibleDate: getShiftedVisibleDate(visibleDate, view, -1) });
  },

  setVisibleDate: (date: Date) => set({ visibleDate: date }),

  setView: (view) => set({ view }),
}));
