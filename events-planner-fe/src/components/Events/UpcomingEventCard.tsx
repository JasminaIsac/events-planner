import { VideoIcon } from "@radix-ui/react-icons";

import { TruncateText } from "~/components/UI";
import { type Event, EVENT_CATEGORIES } from "~/types/events";
import { formatTime } from "~/utils";

type Props = {
  event: Event;
};

export default function UpcomingEventCard({ event }: Props) {
  return (
    <div className="p-1 rounded-lg grid grid-cols-[12px_1fr] gap-2 items-start">
      <div className="flex justify-center items-center pt-1">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: event.color }}
        />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-gray-400">
            {formatTime(event.startDateTime)} - {formatTime(event.endDateTime)}
          </div>
          {event.category === EVENT_CATEGORIES.ONLINE && (
            <VideoIcon color="#99a1af" />
          )}
        </div>

        <TruncateText lines={1} className="text-md font-semibold">
          {event.title}
        </TruncateText>

        <TruncateText lines={2} className="text-sm text-gray-400">
          {event.description}
        </TruncateText>
      </div>
    </div>
  );
}
