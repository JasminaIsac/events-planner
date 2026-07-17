import { forwardRef } from "react";

import { VideoIcon } from "@radix-ui/react-icons";

import { TruncateText } from "~/components/UI";
import { type Event, EVENT_CATEGORIES } from "~/types";
import { formatTime } from "~/utils";

import type { ComponentPropsWithoutRef } from "react";

type EventCardProps = ComponentPropsWithoutRef<"button"> & {
  event: Event;
  duration: number;
};

const EventCard = forwardRef<HTMLButtonElement, EventCardProps>(
  ({ event, duration, style, className = "", ...buttonProps }, ref) => {
    const isCompact = duration <= 15;

    const heightPx =
      typeof style?.height === "number"
        ? style.height
        : parseFloat(style?.height || "0");

    const titleLines = isCompact ? 1 : Math.min(5, Math.floor(heightPx / 18));
    const descLines = isCompact
      ? 0
      : Math.max(0, Math.floor((heightPx - 40) / 16));

    return (
      <button
        ref={ref}
        type="button"
        className={`absolute overflow-hidden rounded-lg border-l-4 ${isCompact ? "p-0 px-1" : "p-2"} text-left flex flex-col justify-start cursor-pointer ${className}`}
        style={{
          backgroundColor: `${event.color}20`,
          borderLeftColor: event.color,
          ...style,
        }}
        {...buttonProps}
      >
        <div className="flex flex-col" title={event.title}>
          <div className="flex items-center align-top gap-1">
            {!isCompact && (
              <p
                className="text-xs font-semibold leading-none"
                style={{ color: event.color }}
              >
                {formatTime(event.startDateTime)}
              </p>
            )}
            {event.category === EVENT_CATEGORIES.ONLINE && (
              <VideoIcon color={event.color} />
            )}
          </div>

          <TruncateText
            lines={titleLines}
            className="text-sm font-bold"
            style={{ color: event.color }}
          >
            {event.title}
          </TruncateText>
        </div>
        {descLines > 0 && (
          <TruncateText
            lines={descLines}
            className="text-xs"
            style={{ color: event.color }}
          >
            {event.description}
          </TruncateText>
        )}
      </button>
    );
  },
);

EventCard.displayName = "EventCard";

export default EventCard;
