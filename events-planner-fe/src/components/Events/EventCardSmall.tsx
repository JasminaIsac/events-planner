import { forwardRef } from "react";

import { type DisplayMode, displayModes, type Event } from "~/types";
import { formatDateWithoutYear, formatTime } from "~/utils";

import type { ComponentPropsWithRef } from "react";

type EventCardSmallProps = ComponentPropsWithRef<"button"> & {
  dayEvent: Event;
  display?: DisplayMode;
};

const EventCardSmall = forwardRef<HTMLButtonElement, EventCardSmallProps>(
  (
    {
      dayEvent,
      display = displayModes.time,
      onClick,
      className = "",
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        {...buttonProps}
        className={`cursor-pointer truncate rounded px-1 py-0.5 text-xs font-medium text-left ${className}`}
        style={{
          backgroundColor: `${dayEvent.color}20`,
          color: dayEvent.color,
        }}
        title={dayEvent.title}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
      >
        {display === displayModes.time
          ? `${formatTime(dayEvent.startDateTime)} `
          : `${formatDateWithoutYear(dayEvent.startDateTime)} `}
        {dayEvent.title}
      </button>
    );
  },
);

EventCardSmall.displayName = "EventCardSmall";

export default EventCardSmall;
