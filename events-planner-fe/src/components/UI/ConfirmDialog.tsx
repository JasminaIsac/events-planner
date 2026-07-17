import * as AlertDialog from "@radix-ui/react-alert-dialog";

import { BUTTON_VARIANTS } from "~/config/styleConstants";

import CustomButton from "./CustomButton";

type ConfirmDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
};

export default function ConfirmDialog({
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </AlertDialog.Title>

          {description && (
            <AlertDialog.Description className="mt-2 text-sm text-gray-500">
              {description}
            </AlertDialog.Description>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <CustomButton
                variant={BUTTON_VARIANTS.OUTLINE.value}
                title={cancelText}
              />
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <CustomButton
                variant={BUTTON_VARIANTS.DESTRUCTIVE.value}
                title={confirmText}
                onClick={onConfirm}
              />
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
