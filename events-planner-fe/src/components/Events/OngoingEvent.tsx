import { TruncateText } from "~/components/UI";
import type { Event } from "~/types";

type OngoingEventProps = {
  event: Event;
};

export default function OngoingEvent({ event }: OngoingEventProps) {
  return (
    <TruncateText
      lines={1}
      style={{ backgroundColor: event.color }}
      className="w-fit text-md font-semibold rounded-lg px-2"
    >
      {event.title}
    </TruncateText>
  );
}
