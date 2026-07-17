import {
  BackpackIcon,
  PersonIcon,
  TimerIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

import { useCurrentUser, useDeleteEvent, useUserById } from "~/hooks";
import { type Event, EVENT_CATEGORIES } from "~/types";
import { formatTime } from "~/utils";

import { toast } from "sonner";

import ModalWrapper from "./ModalWrapper";
import { DetailRow, EventModalFooter, ModalHeader } from "./parts";

type EventDetailsModalProps = {
  event: Event;
  onClose: () => void;
  onEdit: () => void;
};

export default function EventDetailsModal({
  event,
  onClose,
  onEdit,
}: EventDetailsModalProps) {
  const { data: organizer } = useUserById(event.organizerId);
  const { data: currentUser } = useCurrentUser();

  const { mutateAsync: deleteEvent } = useDeleteEvent();

  const isOwner = currentUser?.id === event.organizerId;

  const organizerFullname = organizer
    ? `${organizer.firstName} ${organizer.lastName}`
    : "Unknown organizer";

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(event.id);
      toast.success("Event deleted successfully");

      onClose();
    } catch {
      toast.error("Oops, something went wrong");
    }
  };

  const CategoryIcon =
    event.category === EVENT_CATEGORIES.ONLINE ? VideoIcon : BackpackIcon;

  return (
    <ModalWrapper
      onClose={onClose}
      header={<ModalHeader title={event.title} color={event.color} />}
      footer={
        isOwner && (
          <EventModalFooter onEdit={onEdit} onDelete={handleDeleteEvent} />
        )
      }
    >
      <>
        <div className="space-y-2">
          <DetailRow icon={<TimerIcon />}>
            <span className="font-semibold">
              {formatTime(event.startDateTime)} -{" "}
              {formatTime(event.endDateTime)}
            </span>
          </DetailRow>

          <DetailRow icon={<CategoryIcon />}>{event.category}</DetailRow>

          <DetailRow icon={<PersonIcon />}>{organizerFullname}</DetailRow>
        </div>

        {event.description && (
          <p className="mt-4 text-sm wrap-anywhere leading-6 text-gray-600">
            {event.description}
          </p>
        )}
      </>
    </ModalWrapper>
  );
}
