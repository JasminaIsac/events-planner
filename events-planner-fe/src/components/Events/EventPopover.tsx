import { useState } from "react";

import * as Popover from "@radix-ui/react-popover";

import { EventDetailsModal, FormModal } from "~/components/Modals";
import type { PopoverViewType } from "~/config/styleConstants";
import { POPOVER_VIEW } from "~/config/styleConstants";
import type { Event } from "~/types";

type EventPopoverProps = {
  event: Event;
  isOpen: boolean;
  onOpen: (open: boolean) => void;
  onClose: () => void;
  children: React.ReactNode;
};

export default function EventPopover({
  event,
  isOpen,
  onOpen,
  onClose,
  children,
}: EventPopoverProps) {
  const [popoverView, setPopoverView] = useState<PopoverViewType>(
    POPOVER_VIEW.DETAILS,
  );
  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(open) => {
        onOpen(open);
        if (open) {
          setPopoverView(POPOVER_VIEW.DETAILS);
        }
      }}
    >
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        {popoverView === POPOVER_VIEW.DETAILS ? (
          <EventDetailsModal
            event={event}
            onClose={onClose}
            onEdit={() => setPopoverView(POPOVER_VIEW.EDIT)}
          />
        ) : (
          <FormModal event={event} onClose={onClose} />
        )}
      </Popover.Portal>
    </Popover.Root>
  );
}
