import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

import type { ArrowDirection } from "~/config/styleConstants";
import { ARROW_DIRECTIONS } from "~/config/styleConstants";

type ButtonProps = {
  label: string;
  direction?: ArrowDirection;
  onClick: () => void;
  size?: number;
  className?: string;
};

export default function ArrowButton({
  label,
  direction = ARROW_DIRECTIONS.LEFT,
  onClick,
  className = "",
  size = 22,
}: ButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`grid size-8 place-items-center cursor-pointer ${className} transition`}
      onClick={onClick}
    >
      {direction === ARROW_DIRECTIONS.LEFT ? (
        <CaretLeftIcon width={size} height={size} />
      ) : (
        <CaretRightIcon width={size} height={size} />
      )}
    </button>
  );
}
