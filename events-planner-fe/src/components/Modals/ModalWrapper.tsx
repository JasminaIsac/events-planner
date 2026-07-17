import { Cross2Icon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

import type { ReactNode } from "react";

type ModalWrapperProps = {
  onClose: () => void;
  sideOffset?: number;
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export default function ModalWrapper({
  onClose,
  sideOffset,
  header,
  footer,
  children,
}: ModalWrapperProps) {
  return (
    <Popover.Content
      side="right"
      align="start"
      sideOffset={sideOffset || 8}
      collisionPadding={12}
      className="z-50 min-w-80 max-w-140 rounded-3xl border border-gray-200 bg-white p-4 shadow-lg drop-shadow-black"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        {header}

        <Popover.Close asChild>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-600 transition hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            <Cross2Icon />
          </button>
        </Popover.Close>
      </div>

      {children}

      {footer && (
        <>
          <hr className="my-4 text-gray-200" />
          <div className="flex items-center justify-end gap-2">{footer}</div>
        </>
      )}
    </Popover.Content>
  );
}
