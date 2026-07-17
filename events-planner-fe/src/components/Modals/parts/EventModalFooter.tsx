import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

import { ConfirmDialog, CustomButton } from "~/components/UI";
import { BUTTON_VARIANTS } from "~/config/styleConstants";

type EventModalFooterProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function EventModalFooter({
  onEdit,
  onDelete,
}: EventModalFooterProps) {
  return (
    <>
      <CustomButton
        variant={BUTTON_VARIANTS.OUTLINE.value}
        icon={<Pencil2Icon className="text-gray-700" />}
        title="Edit event"
        onClick={onEdit}
      />
      <ConfirmDialog
        title="Delete event?"
        description="This action cannot be undone."
        confirmText="Delete"
        onConfirm={onDelete}
        trigger={
          <CustomButton
            variant={BUTTON_VARIANTS.DESTRUCTIVE.value}
            icon={<TrashIcon className="text-white" />}
            title="Delete event"
          />
        }
      />
    </>
  );
}
