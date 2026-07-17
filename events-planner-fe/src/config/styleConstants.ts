export const EVENT_COLORS = [
  { label: "Blue", value: "#3B82F6", color: "#3B82F6" },
  { label: "Green", value: "#22C55E", color: "#22C55E" },
  { label: "Red", value: "#EF4444", color: "#EF4444" },
  { label: "Yellow", value: "#EAB308", color: "#EAB308" },
  { label: "Purple", value: "#8B5CF6", color: "#8B5CF6" },
  { label: "Pink", value: "#EC4899", color: "#EC4899" },
] as const;

export const ARROW_DIRECTIONS = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export type ArrowDirection =
  (typeof ARROW_DIRECTIONS)[keyof typeof ARROW_DIRECTIONS];

export const BUTTON_VARIANTS = {
  SOLID: {
    value: "solid",
    style: "bg-blue-600 text-white hover:bg-blue-700",
  },
  OUTLINE: {
    value: "outline",
    style: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
  },
  GHOST: {
    value: "ghost",
    style: "text-gray-700 hover:bg-gray-100",
  },
  DESTRUCTIVE: {
    value: "destructive",
    style: "bg-red-600 text-white hover:bg-red-700",
  },
} as const;

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS]["value"];

export const BUTTON_SIZES = {
  SM: {
    value: "sm",
    style: "px-3 py-1.5",
  },
  MD: {
    value: "md",
    style: "px-4 py-2",
  },
  LG: {
    value: "lg",
    style: "px-5 py-3",
  },
  ICON: {
    value: "icon",
    style: "size-9 p-0",
  },
} as const;

export type ButtonSize =
  (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES]["value"];

export const POPOVER_VIEW = {
  DETAILS: "details",
  EDIT: "edit",
} as const;

export type PopoverViewType = (typeof POPOVER_VIEW)[keyof typeof POPOVER_VIEW];
