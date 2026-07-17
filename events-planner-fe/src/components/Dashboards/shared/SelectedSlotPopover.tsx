import * as Popover from "@radix-ui/react-popover";

import FormModal from "~/components/Modals/FormModal";
import { HOUR_HEIGHT } from "~/config/calendarLayout";
import type { SelectedSlot } from "~/types";

type Props = {
  selectedSlot: SelectedSlot | null;
  onClose: () => void;
};

export default function SelectedSlotPopover({ selectedSlot, onClose }: Props) {
  if (!selectedSlot) {
    return null;
  }

  return (
    <Popover.Root open onOpenChange={(open) => !open && onClose()}>
      <Popover.Anchor asChild>
        <div
          className="absolute left-0 w-full"
          style={{
            top: selectedSlot.top,
            height: HOUR_HEIGHT / 2,
          }}
        />
      </Popover.Anchor>

      <Popover.Portal>
        <FormModal defaultValues={selectedSlot} onClose={onClose} />
      </Popover.Portal>
    </Popover.Root>
  );
}
