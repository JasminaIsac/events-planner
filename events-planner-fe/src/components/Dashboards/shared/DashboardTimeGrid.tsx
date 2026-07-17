import { useMemo } from "react";

import {
  HOUR_HEIGHT,
  START_HOUR,
  TIME_COLUMN_WIDTH,
} from "~/config/calendarLayout";
import { useEvents, useInitialScroll } from "~/hooks";
import { useNow } from "~/hooks/UseNow";
import {
  formatWeekday,
  getDateKey,
  getDaysRange,
  getHiddenHour,
  groupEventsByDate,
} from "~/utils";

import DashboardHeader from "./DashboardHeader";
import DayColumn from "./DayColumn";
import NowBar from "./NowBar";
import TimeColumn from "./TimeColumn";

type DashboardTimeGridProps = {
  days: Date[];
  selectedDate: Date;
  header?: React.ReactNode;
};

export default function DashboardTimeGrid({
  days,
  selectedDate,
  header,
}: DashboardTimeGridProps) {
  const scrollRef = useInitialScroll<HTMLDivElement>(START_HOUR * HOUR_HEIGHT);
  const now = useNow({ intervalMs: 1000 });
  const hiddenHour = getHiddenHour(now);

  const dateRange = useMemo(() => getDaysRange(days), [days]);

  const { data: events = [] } = useEvents({
    startDate: dateRange?.start,
    endDate: dateRange?.end,
  });

  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  return (
    <div className="grid h-full min-h-0 grid-rows-[68px_1fr]">
      {header || (
        <DashboardHeader
          title={`${formatWeekday(selectedDate, "short").toUpperCase()}, ${selectedDate.getDate()}`}
        />
      )}
      <div ref={scrollRef} className="min-h-0 overflow-y-auto hide-scrollbar">
        <div
          className="grid relative"
          style={{
            height: 24 * HOUR_HEIGHT,
            gridTemplateColumns: `${TIME_COLUMN_WIDTH}px repeat(${days.length}, minmax(0, 1fr)) ${TIME_COLUMN_WIDTH}px`,
          }}
        >
          <TimeColumn hiddenHour={hiddenHour} />

          {days.map((day) => {
            const dateKey = getDateKey(day);
            const dayEvents = eventsByDate[dateKey] ?? [];

            return (
              <DayColumn
                key={dateKey}
                day={day}
                dayEvents={dayEvents}
                now={now}
              />
            );
          })}

          <TimeColumn />

          <NowBar days={days} selectedDate={selectedDate} now={now} />
        </div>
      </div>
    </div>
  );
}
