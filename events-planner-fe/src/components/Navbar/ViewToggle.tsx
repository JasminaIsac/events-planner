import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { useCalendarStore } from "~/store/calendarStore";
import type { ViewMode } from "~/types";
import { VIEW_MODES } from "~/types";

export default function ViewToggle() {
  const { view, setView } = useCalendarStore();
  return (
    <div>
      <ToggleGroup.Root
        type="single"
        value={view}
        onValueChange={(val: ViewMode) => val && setView(val)}
        className="flex gap-2"
      >
        {VIEW_MODES.map((m) => (
          <ToggleGroup.Item
            key={m.value}
            value={m.value}
            className="
              px-3 py-1 rounded-lg cursor-pointer
              text-gray-500 font-medium
              hover:bg-gray-100 hover:scale-105
              transition
              data-[state=on]:bg-red-600
              data-[state=on]:text-white
              data-[state=on]:scale-105
            "
          >
            {m.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
