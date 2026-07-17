import { EventForm } from "~/components/Forms";
import type { EventFormDefaults } from "~/components/Forms/EventForm";
import ModalWrapper from "~/components/Modals/ModalWrapper";
import CustomButton from "~/components/UI/CustomButton";
import { BUTTON_VARIANTS } from "~/config/styleConstants";
import type { Event } from "~/types";

import ModalHeader from "./parts/ModalHeader";

type FormModalProps = {
  event?: Event;
  defaultValues?: EventFormDefaults;
  onClose: () => void;
};

export default function FormModal({
  event,
  defaultValues,
  onClose,
}: FormModalProps) {
  const formId = event ? `edit-event-form-${event.id}` : "add-event-form";
  const label = event ? "Edit event" : "Add event";
  return (
    <ModalWrapper
      onClose={onClose}
      sideOffset={26}
      header={<ModalHeader title={label} textStyles="text-2xl mb-1" />}
      footer={
        <>
          <CustomButton
            variant={BUTTON_VARIANTS.OUTLINE.value}
            title="Cancel"
            onClick={onClose}
          />
          <CustomButton
            variant={BUTTON_VARIANTS.DESTRUCTIVE.value}
            title={label}
            type="submit"
            form={formId}
          />
        </>
      }
    >
      <div className="space-y-2 text-gray-800">
        <EventForm
          id={formId}
          event={event}
          defaultValues={defaultValues}
          onSuccess={onClose}
        />
      </div>
    </ModalWrapper>
  );
}
