import { useState } from "react";

import { PlusIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

import { isOrganizer } from "~/auth/roleUtils";
import { FormModal } from "~/components/Modals";
import { CustomButton } from "~/components/UI";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "~/config/styleConstants";

export default function SidebarHeader() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
      </div>

      {isOrganizer() && (
        <Popover.Root open={isFormOpen} onOpenChange={setIsFormOpen}>
          <Popover.Trigger asChild>
            <CustomButton
              variant={BUTTON_VARIANTS.GHOST.value}
              icon={<PlusIcon />}
              size={BUTTON_SIZES.ICON.value}
              aria-label="Add event"
              className="bg-gray-800 text-white hover:bg-gray-700 rounded-xl"
            />
          </Popover.Trigger>

          <Popover.Portal>
            <FormModal onClose={() => setIsFormOpen(false)} />
          </Popover.Portal>
        </Popover.Root>
      )}
    </div>
  );
}
